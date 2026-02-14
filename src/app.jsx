import React from 'react';
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
  return (
    <BrowserRouter>
      <div className="body">
        <header className="container-fluid p-0">
          <nav className="navbar navbar-expand-md fixed-top navbar-light">
            <div className="container-fluid">
              <div className="navbar-brand">TuneChart<sup>&reg;</sup></div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNav"
                aria-controls="mainNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="mainNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/" end>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/rank">Rank a Song</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/charts">Weekly Chart</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="container-fluid">
          <span className="text-reset">Author: Madilynn Feely </span>
          <a href="https://github.com/feelymadi">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}



function NotFound() {
  return (
    <div className="container-fluid text-center">
      404: Return to sender. Address unknown.
    </div>
  );
}
