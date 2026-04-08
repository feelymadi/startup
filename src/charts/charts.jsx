import React, { useEffect, useState } from 'react';
import './charts.css';

export function Charts() {

  // use state
  const [rankings, setRankings] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);



  // rankings 

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

  // compile ranked songs across users
  const groupedSongs = Object.values(
    rankings.reduce((acc, ranking) => {
      const key = ranking.songId;

      if (!acc[key]) {
        acc[key] = {
          songId: ranking.songId,
          title: ranking.title,
          artist: ranking.artist,
          image: ranking.image,
          ratings: [],
        };
      }

      acc[key].ratings.push(ranking.rating);
      return acc;
    }, {})
  );

  const rankedSongs = groupedSongs
    .map((song) => {
      const avg =
        song.ratings.reduce((sum, rating) => sum + rating, 0) / song.ratings.length;

      return {
        ...song,
        globalRating: Math.round(avg * 10) / 10,
      };
    })
    .sort((a, b) => b.globalRating - a.globalRating);

  // top song
  const topSong = rankedSongs[0] ?? null;

  // live websocket notifications
  useEffect(() => {
    // connect wbsocket
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      // react to certain messege
      if (msg.type === 'rating') {
        const newMessage = `${msg.user} rated "${msg.title}" by ${msg.artist} ${msg.rating}`;

        // only 10 most recent
        setLiveEvents((prev) => [newMessage, ...prev.slice(0, 9)]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => socket.close();
  }, []);



  return (
    <main className="container-fluid text-center min-vh-100 py-4">
      <div>
        {/* notification */}

        <div className="alert alert-info" role="alert">
          <h3>Live Activity</h3>
          {liveEvents.length > 0 ? (
            <ul>
              {liveEvents.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          ) : (
            <p>No live activity yet.</p>
          )}
        </div>

        <h1>Welcome to our Weekly Chart</h1>

        <h2>Top Song</h2>
        {/* displays top song and information if exists */}
        {topSong ? (
          <>
            <h2><span id="topTitle">{topSong.title}</span> :{' '}<span id="topArtist">{topSong.artist}</span></h2>
            <img alt="albumPhoto" src={topSong.image || '/albumcoverexample.png'} width="300" className="album-cover" />
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
                <tr key={song.songId}>
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