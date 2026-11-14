import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircleFilled, FireFilled, StarFilled } from "@ant-design/icons";
import { animeKaiApi, normalizeApiResponse } from "../../services/api";
import CarouselRenderer from "../Layouts/CarouselRenderer";
import "./MovieShowcase.css";

const MovieShowcase = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadMovies = async () => {
      try {
        const response = await animeKaiApi.getMovies(1);
        const normalized = normalizeApiResponse(response);
        if (active) setMovies(normalized.results || []);
      } catch (error) {
        console.error("Failed to load movie showcase:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadMovies();

    return () => {
      active = false;
    };
  }, []);

  if (loading || movies.length === 0) return null;

  const featured = movies[0];
  const featuredTitle =
    typeof featured.title === "string"
      ? featured.title
      : featured.title?.english ||
        featured.title?.romaji ||
        featured.title?.userPreferred ||
        featured.title?.native ||
        "Untitled";

  return (
    <section className="movie-showcase" id="movie-universe">
      <div className="movie-showcase-heading">
        <div>
          <span className="movie-eyebrow">
            <FireFilled /> THE CINEMA EXPERIENCE
          </span>
          <h2>Movie <span>Universe</span></h2>
          <p>Big stories. Bigger adventures. All in one place.</p>
        </div>

        <button
          className="movie-explore-button"
          onClick={() => navigate("/movies")}
        >
          Explore All Movies <span>↗</span>
        </button>
      </div>

      <div
        className="movie-featured"
        style={{ "--movie-backdrop": `url("${featured.image}")` }}
      >
        <div className="movie-featured-content">
          <span className="movie-featured-tag">
            <FireFilled /> FEATURED MOVIE
          </span>

          <h3>{featuredTitle}</h3>

          <div className="movie-featured-meta">
            {featured.rating && (
              <span><StarFilled /> {featured.rating}</span>
            )}
            {featured.releaseDate && <span>{featured.releaseDate}</span>}
            {featured.type && <span>{featured.type}</span>}
          </div>

          <button
            className="movie-watch-button"
            onClick={() => navigate(`/watch/${featured.id}`)}
          >
            <PlayCircleFilled /> Watch Now
          </button>
        </div>

        <div className="movie-featured-art">
          <img src={featured.image} alt={featuredTitle} />
        </div>

        <span className="movie-featured-watermark">SENPAIFLIX</span>
      </div>

      <div className="movie-carousel-area">
        <div className="movie-carousel-heading">
          <div>
            <span className="movie-eyebrow">HANDPICKED FOR YOU</span>
            <h3>Discover Movies</h3>
          </div>
          <span className="movie-count">{movies.length} MOVIES</span>
        </div>

        <CarouselRenderer
          finalQuery={movies.slice(1)}
          isAnimeCard={true}
          sectionTitle="Movie Collection"
          url="/movies"
        />
      </div>
    </section>
  );
};

export default MovieShowcase;
