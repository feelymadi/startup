import React, { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchSongs = async () => {
    const res = await fetch(`/api/searchSongs?q=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>TuneChart</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search songs..."
      />

      <button onClick={searchSongs}>
        Search
      </button>

<ul>
  {results.map(song => (
    <li key={song.id}>
      {song.title} — {song.artist}
      <button onClick={() => addSong(song)}>
        Add
      </button>
    </li>
  ))}
</ul>
    </div>
  );
}