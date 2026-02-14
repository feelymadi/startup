import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
  return <div className="body bg-dark text-light">
    <header className="container-fluid">
      <nav className="navbar navbar-expand-md fixed-top navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">TuneChart<sup>&reg;</sup></a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
            aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="index.html">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="rank.html">Rank a Song</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="profile.html">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="charts.html">Weekly Chart</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main className="container-fluid text-center">App components go here</main>

    <footer className="container-fluid">
      <span className="text-reset">Author: Madilynn Feely </span><a href="https://github.com/feelymadi">GitHub</a>
    </footer>

  </div>;
}