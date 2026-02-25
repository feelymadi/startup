import React, { useState } from 'react';
import './rank.css';

export function Rank({ songs, setSongs, user }) {


  const [searchQuery, setSearchQuery] = useState('');
  const [ratingInput, setRatingInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const username = user?.name || user?.username || 'anonymous';

  const [searchedSong, setSearchedSong] = useState(() => {
    return songs.find(s => s.title === 'Would That I') ?? songs[0] ?? null;
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
    setHasSearched(true);
  }

  function handleSubmitRating() {
    const ratingNumber = Number(ratingInput);
    if (!Number.isFinite(ratingNumber) || ratingNumber < 0.5 || ratingNumber > 5) return;

    setSongs(prev =>
      prev.map(song =>
        song.id === searchedSong.id
          ? {
            ...song,
            ratingsByUser: {
              ...(song.ratingsByUser ?? {}),
              [username]: ratingNumber,
            },
          }
          : song
      )
    );

    setSearchedSong(prev => ({
      ...prev,
      ratingsByUser: {
        ...(prev.ratingsByUser ?? {}),
        [username]: ratingNumber,
      },
    }));
    setRatingInput('');
  }

  return (
    <main className="container-fluid text-center min-vh-100 py-4">
      <div>
        <h1>Rank a Song</h1>
        <form id="search-form" className="p-4 border rounded shadow-sm" onSubmit={handleSearch}>
          <div className="d-flex gap-2">
            <label htmlFor="searchInput">Search songs: </label>
            <input id="searchInput" name="search" type="search" placeholder="Songs, artists, albums…" autoComplete="off" className="form-control flex-grow-1" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="btn btn-search">Search for Song</button>
          </div>
        </form>

        {hasSearched && searchedSong && (
          <>
            <h2>{searchedSong.title} : {searchedSong.artist}</h2>
            <img alt="albumPhoto" src={searchedSong.image} width="300" className="album-cover" />
            <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
              <label htmlFor="ratingInput">Rank song:</label>
              <select id="ratingInput" className="form-select" style={{ maxWidth: 140 }} value={ratingInput} onChange={(e) => setRatingInput(e.target.value)}>
                <option value="" disabled>Select</option>
                <option value="0.5">0.5</option>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
              </select>
              <button type="button" className="btn btn-submit" onClick={handleSubmitRating}>Submit Rating</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}