const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let chartSongs = [];
let rankings = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello from TuneChart backend!' });
});

app.get('/api/songs', (req, res) => {
    res.send([
        {
            id: 1,
            title: 'Cherry Wine',
            artist: 'Hozier',
            album: 'Hozier',
            ranking: 1,
        },
        {
            id: 2,
            title: 'The Night We Met',
            artist: 'Lord Huron',
            album: 'Strange Trails',
            ranking: 2,
        },
        {
            id: 3,
            title: 'Work Song',
            artist: 'Hozier',
            album: 'Hozier',
            ranking: 3,
        },
    ]);
});

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

app.get('/api/chart', (req, res) => {
    res.send(chartSongs);
});

app.post('/api/chart', (req, res) => {
    chartSongs.push(req.body);
    res.send({ success: true });
});

app.post('/api/rankings', (req, res) => {
    const { songId, title, artist, image, username, rating } = req.body;
    if (!songId || !title || !artist || !username || rating === undefined) {
        return res.status(400).send({ error: 'Missing ranking data' });
    }

    rankings.push({
        songId,
        title,
        artist,
        image,
        username,
        rating,
    });

    res.send({ success: true });
});

app.get('/api/rankings', (req, res) => {
    res.send(rankings);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

