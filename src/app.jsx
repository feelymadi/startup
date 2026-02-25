import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './about/about';
import { Charts } from './charts/charts';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Rank } from './rank/rank';



export default function App() {
  // current user
  const [user, setUser] = useState(null);

  // global song storage
  const SONGS_KEY = 'tunechart_songs';
  const [songs, setSongs] = useState(loadSongs);

  // load songs
  function loadSongs() {
    const saved = localStorage.getItem(SONGS_KEY);
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: 1,
          title: 'Cursed',
          artist: 'Lord Huron',
          image: 'albumcoverexample.png',
          ratingsByUser: {
            madi: 4,
            alex: 4,
          }
        },
        {
          id: 2,
          title: 'Would That I',
          artist: 'Hozier',
          image: 'albumExampleHozier.png' ,
          ratingsByUser: {
            madi: 3,
            alex: 3,
          }
        },
        {
          id: 3,
          title: 'Fool for Love',
          artist: 'Lord Huron',
          image: 'albumcoverexample.png' ,
          ratingsByUser: {
            madi: 5,
            alex: 5,
          }
        },
      ];
  }

  // restore stored user if has one
  useEffect(() => {
    const savedUser = localStorage.getItem('tunechart:user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // updates local storage when logout
  useEffect(() => {
    if (user) {
      localStorage.setItem('tunechart:user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tunechart:user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(SONGS_KEY, JSON.stringify(songs));
  }, [songs]);






  return (
    <BrowserRouter>
      <div className="body">
        <header className="container-fluid p-0">
          <nav className="navbar navbar-expand-md fixed-top navbar-light">
            <div className="container-fluid">
              <div className="navbar-brand">TuneChart<sup>&reg;</sup></div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="mainNav">
                <ul className="navbar-nav ms-auto">

                  {/* home, default, login */}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/" end>Home</NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                  </li>

                  {/* conditional tabs */}
                  {user && (
                    <>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/rank">Rank a Song</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/charts">Weekly Chart</NavLink>
                      </li>
                    </>
                  )}


                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            {/* changes home page when logged in */}
            <Route path="/" element={
              user ? (
                <div className="container text-center mt-5">
                  <h1>Welcome to TuneChart</h1>
                  <p>You are signed in as {user.email}</p>
                  <button
                    className="btn btn-outline-dark mt-3"
                    onClick={() => setUser(null)}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Login onLogin={setUser} />
              )
            }
            />
            <Route path="/about" element={<About />} />
            {/* protected routes */}
            <Route path="/charts" element={user ? <Charts user={user} /> : <Login user={user} onLogin={setUser} />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Login user={user} onLogin={setUser} />} />
            <Route path="/rank"
              element={
                user ? (
                  <Rank user={user} songs={songs} setSongs={setSongs} />
                ) : (
                  <Login user={user} onLogin={setUser} />
                )} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>
        <footer className="container-fluid">
          <span className="text-reset">Author: Madilynn Feely </span>
          <a href="https://github.com/feelymadi">GitHub</a>
        </footer>
      </div>
    </BrowserRouter >
  );
}



function NotFound() {
  return (
    <div className="container-fluid text-center">
      404: Return to sender. Address unknown.
    </div>
  );
}
