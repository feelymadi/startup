import React from 'react';
import './about.css';

export function About() {
  return (
    <main className="container-fluid text-center py-4">
      <div>
        <h1>About</h1>
        <div className="grid">
          <p>
            Do you ever feel stuck when you are listening to music? Do you ever want
            to freshen up your music taste by exploring your friends reccommendations?
            Or do you feel the oppisite and find certain songs so amazing that you want
            to share them with your friends? Well I decided to create a website to rank
            and discover music. When you find a song new song, you can hop on my website
            and rate the song. Weekly charts will keep you up to date with a community of
            music listeners reccomendations.
          </p>
        </div>
        <div className="grid">
          <p>
            TuneChart lets you rank songs and keep up with the best songs
            via a highest ranked chart for the week based on peoples ranking.
          </p>
        </div>
      </div>
    </main>
  );
}