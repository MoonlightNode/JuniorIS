import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main className="home-content">
        <h1 className="home-title">Olive Branch</h1>

        <div className="home-widgets">
          <div className="home-widget">Widget 1</div>
          <div className="home-widget">Widget 2</div>
          <div className="home-widget">Widget 3</div>
        </div>
      </main>
    </div>
  );
}
