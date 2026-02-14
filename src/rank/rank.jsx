import React from 'react';

export function Rank() {
  return (
    <main className="container-fluid text-center bg-light min-vh-100 py-4">
      <div>
        <h1>Rank a Song</h1>
        <form id="search-form" className="p-4 border rounded shadow-sm">
          <div className="d-flex gap-2">
            <label for="search">Search songs: </label>
            <input id="search" name="query" type="search" placeholder="Songs, artists, albums…" autocomplete="off"
              className="form-control flex-grow-1" />
            <button type="submit" className="btn btn-search">Search for Song</button>
          </div>
        </form>

        <h2><span id="searchTitle">Searched Song Title</span> : <span id="searchArtist">Searched Artist</span></h2>
        <img alt="albumPhoto" src="albumcoverexample.png" width="300" className="album-cover" />
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <label for="rating">Rating (0 – 5)</label>
          <input id="rating" name="rating" type="number" min="0" max="5" step="0.1" placeholder="4.5"
            className="rating-input form-control" />
          <button type="submit" className="btn btn-submit">Submit Rating</button>
        </div>
      </div>
    </main>
  );
}