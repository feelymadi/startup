import React from 'react';
import './charts.css';

export function Charts({ songs }) {
  function getGlobalRating(song) {
    const ratings = Object.values(song.ratingsByUser ?? {});
    if (ratings.length === 0) return null;
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return Math.round(avg * 10) / 10;
  }

  const rankedSongs = [...songs]
    .map(song => ({
      ...song,
      globalRating: getGlobalRating(song),
    }))
    .filter(song => song.globalRating != null)
    .sort((a, b) => b.globalRating - a.globalRating);

  const topSong = rankedSongs[0] ?? null;


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
        {topSong ? (
          <>
            <h2><span id="topTitle">{topSong.title}</span> :{' '}<span id="topArtist">{topSong.artist}</span></h2>
            <img alt="albumPhoto" src={topSong.image} width="300" className="album-cover" />
          </>
        ) : (
          <p>No songs have been rated yet :/</p>
        )}

        <h2>This Weeks Chart</h2>

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
              {rankedSongs.map((song, i) => (
                <tr key={song.id}>
                  <td>{i + 1}</td>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.globalRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-3">No songs have been rated yet.</p>
        )}
      </div>
    </main>
  );
}