import React from 'react';
import './charts.css';

export function Charts({ songs }) {

  function getGlobalRating(song) {
    const ratings = Object.values(song.ratingsByUser ?? {});
    if (ratings.length === 0) return null;
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return Math.round(avg * 10) / 10;
  }

  function getRaterCount(song) {
    return Object.values(song.ratingsByUser ?? {}).length;
  }


  return (
    <main className="container-fluid text-center min-vh-100 py-4">
      <div>
        <div className="alert alert-info" role="alert">
          <ul className="notification">
            <li className="player-name">Mary rated a new song</li>
            <li className="player-name">Jim rated a new song</li>
          </ul>
        </div>

        <h1>Welcome to our Weekly Chart</h1>
        <h2>Top Song</h2>
        <h2><span id="topTitle">Cursed</span> : <span id="topArtist">Lord Huron</span></h2>
        <img alt="albumPhoto" src="albumcoverexample.png" width="300" className="album-cover" />
        <h2>This Weeks Chart</h2>
        <table className="rank-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Cursed</td>
              <td>Lord Huron</td>
              <td>5</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Would that I</td>
              <td>Hozier</td>
              <td>4.8</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Cleopatra</td>
              <td>The Lumineers</td>
              <td>4.5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}