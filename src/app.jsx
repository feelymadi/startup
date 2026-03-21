import React, { useEffect, useState } from 'react';

export default function App() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(() => setError('Failed to load songs'));
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>TuneChart</h1>

      {error && <p>{error}</p>}

      <ul>
        {songs.map(song => (
          <li key={song.id}>
            #{song.ranking} {song.title} — {song.artist} ({song.album})
          </li>
        ))}
      </ul>
    </div>
  );
}