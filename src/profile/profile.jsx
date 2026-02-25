import React from 'react';
import './profile.css';

export function Profile({ songs, user }) {

  const username = user?.name || user?.username || 'anonymous';

  const rankedSongs = [...songs]
    .map(song => ({
      ...song,
      userRating: song.ratingsByUser?.[username] ?? null,
    }))
    .filter(song => song.userRating != null)
    .sort((a, b) => b.userRating - a.userRating);

  const topSong = rankedSongs[0] ?? null;


  return (
    <main className="container-fluid text-center min-vh-100 py-4">
      <div>
        <h1>Profile</h1>
        <h2>Your Top Song</h2>

        {topSong ? (
          <>
            <h2>
              <span id="topTitle">{topSong.title}</span> by{' '}
              <span id="topArtist">{topSong.artist}</span>
            </h2>
            <img alt="albumPhoto" src={topSong.image} width="300" className="album-cover" />
          </>
        ) : (
          <p>You haven’t rated any songs yet :/</p>
        )}

        <h2>Your all time Ratings Chart</h2>
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
                  <td>{song.userRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-3">Rate songs in the Rank tab to build your profile chart.</p>
        )}
        <a href="/rank" className="btn">Rank New Song</a>
      </div>
    </main>
  );
}