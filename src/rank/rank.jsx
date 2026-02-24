import React, { useState } from 'react';
import './rank.css';

export function Rank() {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Cursed', artist: 'Lord Huron', rating: 4.7, image: 'albumcoverexample.png' },
    { id: 2, title: 'Would That I', artist: 'Hozier', rating: 4.4, image: 'albumExampleHozier.png' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingInput, setRatingInput] = useState('');

  const [searchedSong, setSearchedSong] = useState({
    title: 'Searched Song Title',
    artist: 'Searched Artist',
    image: 'albumcoverexample.png',
  });

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const found = songs.find(song =>
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q)
    );
    
    setSearchedSong(found || songs.find(s => s.title === 'Would That I'));
  }

  return (
    <main className="container-fluid text-center min-vh-100 py-4">
      <div>
        <h1>Rank a Song</h1>
        <form id="search-form" className="p-4 border rounded shadow-sm" onSubmit={handleSearch}>
          <div className="d-flex gap-2">
            <label htmlFor="searchInput">Search songs: </label>
            <input id="searchInput" name="search" type="search" placeholder="Songs, artists, albums…" autoComplete="off" className="form-control flex-grow-1" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="btn btn-search">Search for Song</button>
          </div>
        </form>

        <h2>{searchedSong.title} : {searchedSong.artist}</h2>
        <img alt="albumPhoto" src={searchedSong.image} width="300" className="album-cover" />

        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <label htmlFor="search">Rank song: </label>
          <input value={ratingInput} onChange={(e) => setRatingInput(e.target.value)}/>
          <button type="submit" className="btn btn-submit">Submit Rating</button>
        </div>
      </div>
    </main>
  );
}