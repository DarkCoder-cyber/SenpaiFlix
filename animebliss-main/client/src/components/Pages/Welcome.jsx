import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <main className="welcome-page">
      <div className="welcome-glow welcome-glow-one" />
      <div className="welcome-glow welcome-glow-two" />

      <div className="cosmic-universe" aria-hidden="true">
        <div className="cosmic-stars" />
        <div className="cosmic-planet cosmic-planet-one">
          <div className="planet-ring" />
        </div>
        <div className="cosmic-planet cosmic-planet-two" />
        <div className="cosmic-planet cosmic-planet-three" />
        <div className="cosmic-moon" />
        <div className="cosmic-meteor cosmic-meteor-one" />
        <div className="cosmic-meteor cosmic-meteor-two" />
        <div className="cosmic-meteor cosmic-meteor-three" />
        <div className="cosmic-meteor cosmic-meteor-four" />
      </div>

      <header className="welcome-header">
        <div className="welcome-brand">
          <img src={logo} alt="SenpaiFlix" />
          <span>Senpai<span className="welcome-accent">Flix</span></span>
        </div>
        <div className="welcome-header-right">
          <span className="welcome-status">
            <span className="welcome-status-dot" />
            YOUR ANIME DESTINATION
          </span>
        </div>
      </header>

      <section className="welcome-stage">
        <aside className="welcome-side-card welcome-side-left">
          <div className="side-card-orbit">
            <span className="orbit-core">✦</span>
            <span className="orbit-ring orbit-ring-one" />
            <span className="orbit-ring orbit-ring-two" />
          </div>
          <span className="side-card-eyebrow">DISCOVER</span>
          <h3>Worlds beyond imagination.</h3>
          <p>Explore stories, genres and unforgettable adventures.</p>
          <div className="side-card-tags">
            <span>Adventure</span>
            <span>Fantasy</span>
          </div>
        </aside>

        <div className="welcome-content">
          <div className="welcome-card-topline">
            <span className="welcome-badge-dot" />
            <span>YOUR NEXT ADVENTURE STARTS HERE</span>
            <span className="welcome-topline-sparkle">✧</span>
          </div>

          <div className="welcome-emblem">
            <div className="welcome-emblem-ring">
              <img src={logo} alt="" />
            </div>
            <span className="emblem-spark emblem-spark-one">✦</span>
            <span className="emblem-spark emblem-spark-two">✧</span>
          </div>

          <span className="welcome-kicker">WELCOME TO THE UNIVERSE OF</span>

          <h1>
            Your Anime.
            <span>Your Universe.</span>
          </h1>

          <p className="welcome-description">
            Discover amazing stories, unforgettable characters, and endless
            adventures. Your anime journey begins with SenpaiFlix.
          </p>

          <button
            className="welcome-continue"
            onClick={() => navigate("/home")}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;

              event.currentTarget.style.setProperty("--magnet-x", `${x * 44}px`);
              event.currentTarget.style.setProperty("--magnet-y", `${y * 44}px`);
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.setProperty("--magnet-x", "0px");
              event.currentTarget.style.setProperty("--magnet-y", "0px");
            }}
          >
            <span>Explore SenpaiFlix</span>
            <span className="welcome-button-arrow" aria-hidden="true">↗</span>
          </button>

          <div className="welcome-features">
            <span><b>✦</b> Explore Anime</span>
            <i />
            <span><b>✦</b> Discover Stories</span>
            <i />
            <span><b>✦</b> Your Watchlist</span>
          </div>
        </div>

        <aside className="welcome-side-card welcome-side-right">
          <div className="side-card-visual">
            <div className="visual-glow" />
            <span className="visual-star visual-star-one">✦</span>
            <span className="visual-star visual-star-two">✧</span>
            <div className="visual-planet" />
          </div>
          <span className="side-card-eyebrow">YOUR JOURNEY</span>
          <h3>One universe. Endless stories.</h3>
          <p>Keep your favourites close and find your next adventure.</p>
          <div className="side-card-bottom">
            <span className="side-card-line" />
            <span>MADE FOR ANIME FANS</span>
          </div>
        </aside>
      </section>

      <section className="welcome-downloads" aria-labelledby="welcome-download-title">
        <div className="welcome-download-heading">
          <span className="welcome-download-eyebrow">TAKE SENPAIFLIX WITH YOU</span>
          <h2 id="welcome-download-title">Your universe. Every device.</h2>
          <p>Choose your platform and get ready for your next anime adventure.</p>
        </div>

        <div className="welcome-download-grid">
          <article className="welcome-download-card">
            <div className="welcome-download-icon" aria-hidden="true">▣</div>
            <span className="welcome-download-platform">ANDROID</span>
            <h3>SenpaiFlix for Android</h3>
            <p>Enjoy SenpaiFlix on your Android device.</p>
            <a
              className="welcome-download-link"
              href="https://github.com/DarkCoder-cyber/SenpaiFlix/releases/download/v1.0.0/app-debug.apk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View APK releases</span>
              <span aria-hidden="true">↗</span>
            </a>
            <span className="welcome-download-note">APK release availability may vary.</span>
          </article>

          <article className="welcome-download-card">
            <div className="welcome-download-icon" aria-hidden="true">▱</div>
            <span className="welcome-download-platform">WINDOWS</span>
            <h3>SenpaiFlix for Windows</h3>
            <p>Get the desktop installer for your Windows PC.</p>
            <a
              className="welcome-download-link"
              href="https://github.com/DarkCoder-cyber/SenpaiFlix/actions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View EXE builds</span>
              <span aria-hidden="true">↗</span>
            </a>
            <span className="welcome-download-note">Unsigned builds may be blocked by Windows Smart App Control.</span>
          </article>
        </div>
      </section>

      <section className="welcome-about" aria-labelledby="welcome-about-title">
        <div className="welcome-about-inner">
          <span className="welcome-about-eyebrow">WELCOME TO YOUR ANIME UNIVERSE</span>
          <h2 id="welcome-about-title">Discover the World of <span>SenpaiFlix</span></h2>
          <p className="welcome-about-intro">
            SenpaiFlix brings your anime experience together in one place.
            Discover new titles, explore different genres, organise your favourites
            and enjoy a smooth experience across supported devices.
          </p>

          <div className="welcome-about-block">
            <h3>✨ Why Choose SenpaiFlix?</h3>
            <div className="welcome-about-grid">
              <article>
                <span>🎬</span>
                <h4>Anime Discovery</h4>
                <p>Explore anime titles and discover stories from different genres.</p>
              </article>
              <article>
                <span>❤️</span>
                <h4>Your Watchlist</h4>
                <p>Keep your favourite anime organised in your personal watchlist.</p>
              </article>
              <article>
                <span>▶</span>
                <h4>Continue Watching</h4>
                <p>Keep track of your viewing history and pick up where you left off.</p>
              </article>
              <article>
                <span>📥</span>
                <h4>Offline Library</h4>
                <p>Access supported offline content when it is available on your device.</p>
              </article>
            </div>
          </div>

          <div className="welcome-about-block">
            <h3>🌟 Explore Anime Genres</h3>
            <div className="welcome-genre-list">
              <span>Action</span>
              <span>Adventure</span>
              <span>Fantasy</span>
              <span>Romance</span>
              <span>Comedy</span>
              <span>Mystery</span>
              <span>Drama</span>
              <span>Science Fiction</span>
            </div>
          </div>

          <div className="welcome-about-block welcome-about-platforms">
            <h3>📱 Your Anime Experience Across Devices</h3>
            <p>
              Explore SenpaiFlix on the web and discover supported Android
              and Windows versions as they become available.
            </p>
          </div>

          <div className="welcome-about-cta">
            <h3>Your Universe. Your Anime. Your Adventure.</h3>
            <p>Start exploring SenpaiFlix and discover your next favourite story.</p>
          </div>
        </div>
      </section>

      <footer className="welcome-footer">
        <span>© {new Date().getFullYear()} SenpaiFlix</span>
        <span className="welcome-footer-center">A UNIVERSE MADE OF STORIES</span>
        <span>MADE FOR ANIME FANS</span>
      </footer>
    </main>
  );
};

export default Welcome;
