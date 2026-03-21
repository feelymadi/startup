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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});