import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

export function Profile({ user }) {
  // username
  const username = (user?.email || user?.name || user?.username || 'anonymous').toLowerCase();

  // songs
  const [rankings, setRankings] = useState([]);

  // load songs
useEffect(() => {
  async function loadRankings() {
    const response = await fetch('/api/rankings', {
      credentials: 'include',
    });
    const data = await response.json();
    setRankings(data);
  }
  loadRankings();
}, []);

  // compile user's ranked songs
  const rankedSongs = rankings
    .filter(ranking => ranking.username === username)
    .sort((a, b) => b.rating - a.rating);

  const topSong = rankedSongs[0] ?? null;

  return (
    <main className="container-fluid text-center min-vh-100 py-4">
      <div>
        <h1>Profile</h1>
        <h2>Your Top Song</h2>

        {/* show top song and photo if exists */}
        {topSong ? (
          <>
            <h2>
              <span id="topTitle">{topSong.title}</span> by{' '}
              <span id="topArtist">{topSong.artist}</span>
            </h2>
            <img alt="albumPhoto" src={topSong.image || '/albumcoverexample.png'} width="300" className="album-cover" />
          </>
        ) : (
          <p>You haven’t rated any songs yet :/</p>
        )}

        <h2>Your Ratings</h2>
        {/* show ranked songs if exists */}
        {rankedSongs.length > 0 ? (
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
              {/* use ranked songs to compile table */}
              {rankedSongs.map((song, i) => (
                <tr key={song.songId}>
                  <td>{i + 1}</td>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-3">Rate songs in the Rank tab to build your profile chart.</p>
        )}
        <Link to="/rank" className="btn">Rank New Song</Link>
      </div>
    </main>
  );
}