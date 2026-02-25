import React, { useEffect, useState } from 'react';
import './charts.css';

export function Charts({ songs, notifications }) {
  // calculating overall rating
  function getGlobalRating(song) {
    const ratings = Object.values(song.ratingsByUser ?? {});
    if (ratings.length === 0) return null;
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return Math.round(avg * 10) / 10;
  }

  // notification functionality and mock up
  const [liveMocks, setLiveMocks] = useState([]);
  const mockUsers = ['Madi', 'Alex', 'Jo', 'Sam', 'Taylor'];
  const mockRatings = [3, 3.5, 4, 4.5, 5];

  // compile random notifications
  function generateRandomNotification() {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const randomRating = mockRatings[Math.floor(Math.random() * mockRatings.length)];
    return {
      id: crypto.randomUUID(),
      text: `${randomUser} rated "${randomSong?.title}" (${randomRating})`,
      time: new Date().toLocaleTimeString(),
    };
  }

  // interval for noficiation usinf use effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMocks(prev => [
        generateRandomNotification(),
        ...prev
      ].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, [songs]);

  const displayNotifications =
    (notifications?.length ?? 0) > 0
      ? notifications
      : liveMocks;

  // compile ranked songs across users
  const rankedSongs = [...songs]
    .map(song => ({
      ...song,
      globalRating: getGlobalRating(song),
    }))
    .filter(song => song.globalRating != null)
    .sort((a, b) => b.globalRating - a.globalRating);

  // catch for no songs ranked
  const topSong = rankedSongs[0] ?? null;

  return (
    <main className="container-fluid text-center min-vh-100 py-4">
      <div>
        {/* notification */}
        <div className="alert alert-info" role="alert">
          <ul className="notification">
            {displayNotifications.map(n => (
              <li key={n.id} className="player-name">
                {n.text} <span className="text-muted">({n.time})</span>
              </li>
            ))}
          </ul>
        </div>

        <h1>Welcome to our Weekly Chart</h1>

        <h2>Top Song</h2>
        {/* displays top song and information if exists */}
        {topSong ? (
          <>
            <h2><span id="topTitle">{topSong.title}</span> :{' '}<span id="topArtist">{topSong.artist}</span></h2>
            <img alt="albumPhoto" src={topSong.image} width="300" className="album-cover" />
          </>
        ) : (
          <p>No songs have been rated yet :/</p>
        )}

        <h2>This Weeks Chart</h2>

        {/* displays table if ranked songs exists  */}
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
              {/* compiles table based off of all time rankings  */}
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
          <p className="mt-3">No songs have been rated yet :/</p>
        )}
      </div>
    </main>
  );
}