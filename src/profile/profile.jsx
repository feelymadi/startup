import React from 'react';
import './profile.css';

export function Profile() {
  return (
    <main className="container-fluid text-center min-vh-100 py-4">      <div>
        <h1>Profile</h1>
        <h2>Your Top Song: <span id="topTitle">Fool for Love</span> by <span id="topArtist">Lord Huron</span></h2>
        <img alt="albumPhoto" src="albumcoverexample.png" width="300" className="album-cover" />
        <h2>Your all time Ratings Chart</h2>
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
              <td>Fool for Love</td>
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
        <a href="rank.html" className="btn">Rank New Song</a>
      </div>
    </main>
  );
}