// libraries 

const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const { peerProxy, broadcastEvent } = require('./peerProxy');

// DB setup
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('tuneChart');
const userCollection = db.collection('user');
const rankingCollection = db.collection('ranking');


// catch for bad mongo connection
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log('Connected to database');
    } catch (ex) {
        console.log(`Unable to connect to database because ${ex.message}`);
        process.exit(1);
    }
})();

// server setup
const app = express();
const httpService = http.createServer(app);
peerProxy(httpService);
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

function setAuthCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
    });
}

// in memory storage
let chartSongs = [];
let sessions = {};

// debugger
app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello from TuneChart backend!' });
});

httpService.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// SONG SEARCH API CALL
app.get('/api/searchSongs', async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).send({ error: 'Missing query parameter q' });
        }

        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=10`;

        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text();
            console.log('iTunes bad response:', response.status, text);
            return res.status(response.status).send({ error: 'iTunes request failed' });
        }

        const data = await response.json();

        const songs = (data.results || []).map((song) => ({
            id: song.trackId,
            title: song.trackName,
            artist: song.artistName,
            album: song.collectionName,
            image: song.artworkUrl100
                ? song.artworkUrl100.replace('100x100', '300x300')
                : null,
            preview: song.previewUrl || null,
        }));

        res.send(songs);
    } catch (error) {
        console.log('SearchSongs error:', error);
        res.status(500).send({ error: 'Server error while searching songs' });
    }
});

// CHARTS
app.get('/api/chart', (req, res) => {
    res.send(chartSongs);
});

app.post('/api/chart', (req, res) => {
    chartSongs.push(req.body);
    res.send({ success: true });
});

// RANKINGS
app.post('/api/rankings', verifyAuth, async (req, res) => {

    // song
    const { songId, title, artist, image, rating } = req.body;

    // error catch
    if (!songId || !title || !artist || rating === undefined) {
        return res.status(400).send({ error: 'Missing ranking data' });
    }

    // save ranking in mongo
    await rankingCollection.insertOne({
        songId,
        title,
        artist,
        image,
        username: req.userEmail.toLowerCase(),
        rating,
        createdAt: new Date(),
    });

    // notification
    broadcastEvent({
        type: 'rating',
        user: req.userEmail.toLowerCase(),
        title,
        artist,
        rating,
    });
    // validate
    res.send({ success: true });
});


app.get('/api/rankings', verifyAuth, async (req, res) => {
    // load user rankings from mongo

    const rankings = await rankingCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    res.send(rankings);
});

// LOGIN HANDLING
app.post('/api/auth/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: 'Missing email or password' });
    }

    // verify user
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        return res.status(409).send({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
        email,
        passwordHash,
    };

    // add user
    await userCollection.insertOne(newUser);

    const token = uuidv4();
    sessions[token] = email;
    setAuthCookie(res, token);

    res.send({ email });
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: 'Missing email or password' });
    }

    // find user in mongo
    const user = await userCollection.findOne({ email });
    if (!user) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = uuidv4();
    sessions[token] = email;
    setAuthCookie(res, token);

    res.send({ email });
});

app.delete('/api/auth/logout', (req, res) => {
    const token = req.cookies.token;

    if (token) {
        delete sessions[token];
    }

    res.clearCookie('token');
    res.send({ success: true });
});

function verifyAuth(req, res, next) {
    const token = req.cookies.token;

    if (!token || !sessions[token]) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    req.userEmail = sessions[token];
    next();
}

app.get('/api/auth/me', verifyAuth, (req, res) => {
    res.send({ email: req.userEmail });
});



