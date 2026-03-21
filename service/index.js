const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});