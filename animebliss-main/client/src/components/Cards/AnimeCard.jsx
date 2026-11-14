import React, { useState } from "react";
import { StarFilled, PlayCircleFilled, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { isInWatchlist, addToWatchlist, removeFromWatchlist } from "../../services/storage";
import toast from "react-hot-toast";
import "./AnimeCard.css";

const AnimeCard = ({ title, image, id, rating, year, episodeNumber, type, totalEpisodes }) => {
  const navigate = useNavigate();
  const [inWatchlist, setInWatchlist] = useState(() => isInWatchlist(id));
  const [imgLoaded, setImgLoaded] = useState(false);

  const displayTitle = typeof title === "object" ? title?.english || title?.romaji || "Untitled" : title || "Untitled";

  const handleCardClick = () => {
    navigate(`/watch/${id}`);
  };

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(id);
      setInWatchlist(false);
      toast.success("Removed from Watchlist");
    } else {
      addToWatchlist({
        id,
        title: typeof title === "object" ? title : { english: title, romaji: title },
        image,
        rating,
        releaseDate: year,
        totalEpisodes: totalEpisodes || episodeNumber || 0,
      });
      setInWatchlist(true);
      toast.success("Added to Watchlist!");
    }
  };

  const formattedRating = rating ? (rating > 10 ? (rating / 10).toFixed(1) : Number(rating).toFixed(1)) : null;

  return (
    <div
      className="animecard-wrapper"
      onClick={handleCardClick}
      title={displayTitle}
      onMouseMove={(e) => {
        const poster = e.currentTarget.querySelector(".animecard-poster-container");
        if (!poster) return;

        const rect = poster.getBoundingClientRect();

        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        poster.style.setProperty("--glow-x", `${x * 100}%`);
        poster.style.setProperty("--glow-y", `${y * 100}%`);

        const tiltX = (0.5 - y) * 7;
        const tiltY = (x - 0.5) * 7;

        e.currentTarget.style.setProperty("--mouse-x", `${x * 100}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${y * 100}%`);
        e.currentTarget.style.setProperty("--tilt-x", `${tiltX}deg`);
        e.currentTarget.style.setProperty("--tilt-y", `${tiltY}deg`);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty("--tilt-x", "0deg");
        e.currentTarget.style.setProperty("--tilt-y", "0deg");
        e.currentTarget.style.setProperty("--mouse-x", "50%");
        e.currentTarget.style.setProperty("--mouse-y", "50%");
      }}
    >
      <div className="animecard-poster-container">
        {!imgLoaded && <div className="animecard-skeleton skeleton" />}
        <img
          src={image || "https://placehold.co/300x450/151824/8b5cf6?text=AnimeBliss"}
          alt={displayTitle}
          className={`animecard-img ${imgLoaded ? "loaded" : "loading"}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.src = "https://placehold.co/300x450/151824/8b5cf6?text=AnimeBliss";
            setImgLoaded(true);
          }}
        />

        {/* Hover overlay with play button */}
        <div className="animecard-overlay">
          <div className="animecard-play-btn">
            <PlayCircleFilled />
          </div>
        </div>

        {/* Top Badges */}
        <div className="animecard-top-badges">
          {formattedRating && (
            <div className="animecard-rating-badge">
              <StarFilled style={{ color: "#fbbf24" }} />
              <span>{formattedRating}</span>
            </div>
          )}
          <button
            className={`animecard-bookmark-btn ${inWatchlist ? "active" : ""}`}
            onClick={handleWatchlistClick}
            aria-label="Toggle Watchlist"
            title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            {inWatchlist ? <HeartFilled style={{ color: "#ec4899" }} /> : <HeartOutlined />}
          </button>
        </div>

        {/* Bottom Ep / Type Badge */}
        {(episodeNumber > 0 || type) && (
          <div className="animecard-bottom-badge">
            {episodeNumber > 0 ? `EP ${episodeNumber}` : type}
          </div>
        )}
      </div>

      <div className="animecard-info">
        <h3 className="animecard-title" title={displayTitle}>
          {displayTitle}
        </h3>
        <div className="animecard-meta">
          {year && <span className="animecard-year">{year}</span>}
          {type && <span className="animecard-type">{type}</span>}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
