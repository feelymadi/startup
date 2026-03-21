import React, { useEffect, useState } from 'react';
import './rank.css';

export function Rank({ songs, setSongs, user }) {

  // variable for storing username 
  const username = (user?.email || user?.name || user?.username || 'anonymous').toLowerCase();

  // variables for searching
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedSong, setSearchedSong] = useState(null);

  // search function 
  async function handleSearch(e) {
    e.preventDefault();
    setShowThanks(false);
    const q = searchQuery.trim();
    if (!q) return;

    const response = await fetch(`/api/searchSongs?q=${encodeURIComponent(q)}`);
    const data = await response.json();

    setSearchResults(data);
    setSearchedSong(null);
    setHasSearched(false);
  }

  // variable for rating
  const [ratingInput, setRatingInput] = useState('');

  // rating function
  function handleSubmitRating() {

    // catch
    if (!searchedSong) return;

    const ratingNumber = Number(ratingInput);
    if (!Number.isFinite(ratingNumber) || ratingNumber < 0.5 || ratingNumber > 5) return;


    setSongs(prev => {

      // already have?
      const existing = prev.find(
        song => song.id === searchedSong.id
      );

      // song already exists (update)
      if (existing) {
        return prev.map(song =>
          song.id === searchedSong.id
            ? {
              ...song,
              ratingsByUser: {
                ...(song.ratingsByUser ?? {}),
                [username]: ratingNumber,
              },
            }
            : song
        );
      }

      // brand new song (add)
      return [
        ...prev,
        {
          ...searchedSong,
          image: searchedSong.image || '/albumcoverexample.png',
          ratingsByUser: {
            [username]: ratingNumber,
          },
        },
      ];

    });

    // reset
    setRatingInput('');
    setHasSearched(false);
    setSearchQuery('');
    setShowThanks(true);
    setSearchedSong(null);
    setSearchResults([]);

  }

  // variable for submission confirmation
  const [showThanks, setShowThanks] = useState(false);

  // display confirmation timed
  useEffect(() => {
    if (!showThanks) return;
    const t = setTimeout(() => setShowThanks(false), 3000);
    return () => clearTimeout(t);
  }, [showThanks]);

  return (
    <main className="container-fluid text-center min-vh-100 py-4">
      <div>

        <h1>Rank a Song</h1>

        {/* search form */}
        <form id="search-form" className="p-4 border rounded shadow-sm" onSubmit={handleSearch}>
          <div className="d-flex gap-2">
            <label htmlFor="searchInput">Search songs: </label>
            <input id="searchInput" name="search" type="search" placeholder="Songs, artists, albums…" autoComplete="off" className="form-control flex-grow-1" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="btn btn-search">Search for Song</button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div className="mt-4">
            <h2>Select a song</h2>

            <ul className="list-unstyled">
              {searchResults.map(song => (
                <li key={song.id} className="mb-2">

                  {song.title} — {song.artist}

                  <button
                    type="button"
                    className="btn btn-search ms-2"
                    onClick={() => {
                      setSearchedSong(song);
                      setHasSearched(true);
                    }}
                  >
                    Select
                  </button>

                </li>
              ))}
            </ul>

          </div>
        )}

        {searchResults.length === 0 && hasSearched === false && searchQuery !== '' && (
          <p className="mt-3">No results found.</p>
        )}

        {/* show after song is search (show result) */}
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
              {/* rating button */}
              <button type="button" className="btn btn-submit" onClick={handleSubmitRating}>Submit Rating</button>
            </div>
          </>
        )}

        {/* rating submisison confirmation */}
        {showThanks && (
          <div className="alert alert-success mt-3" role="alert">
            Thank you for ranking!
          </div>
        )}

      </div>
    </main>
  );
}