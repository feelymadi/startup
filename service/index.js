const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

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

    const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(query)}&fmt=json&limit=10`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TuneChart/1.0 (madilynnhr.com)',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.log('MusicBrainz bad response:', response.status, text);
      return res.status(response.status).send({ error: 'MusicBrainz request failed' });
    }

    const data = await response.json();

    const songs = (data.recordings || []).map((recording) => ({
      id: recording.id,
      title: recording.title,
      artist:
        recording['artist-credit']?.map((a) => a.name).join(', ') || 'Unknown',
      length: recording.length || null,
    }));

    res.send(songs);
  } catch (error) {
    console.log('SearchSongs error:', error);
    res.status(500).send({ error: 'Server error while searching songs' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});