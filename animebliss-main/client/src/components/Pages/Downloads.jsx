import React, { useEffect, useState } from "react";
import Navbar from "../Sections/Navbar";
import {
  getOfflineVideos,
  saveOfflineVideo,
  deleteOfflineVideo,
} from "../../services/offlineStorage";
import toast from "react-hot-toast";
import "./Downloads.css";

const formatSize = (bytes = 0) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Downloads = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const loadVideos = async () => {
    try {
      setVideos(await getOfflineVideos());
    } catch (error) {
      console.error(error);
      toast.error("Could not load offline videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    if (!selectedVideo) {
      setSelectedVideoUrl("");
      return;
    }

    const url = URL.createObjectURL(selectedVideo.blob);
    setSelectedVideoUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedVideo]);

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    setSaving(true);

    try {
      const id = `local-${Date.now()}`;

      await saveOfflineVideo({
        id,
        title: file.name.replace(/\.[^/.]+$/, ""),
        episodeNumber: 1,
        blob: file,
      });

      toast.success("Video saved for offline watching");
      await loadVideos();
    } catch (error) {
      console.error(error);
      toast.error("Could not save video. Check available storage.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOfflineVideo(id);

      if (selectedVideo?.id === id) {
        setSelectedVideo(null);
      }

      await loadVideos();
      toast.success("Offline video deleted");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete video");
    }
  };

  const totalSize = videos.reduce((sum, video) => sum + (video.size || 0), 0);

  return (
    <div className="downloads-page">
      <Navbar />

      <main className="downloads-content">
        <div className="downloads-heading">
          <div>
            <span className="downloads-eyebrow">YOUR PERSONAL LIBRARY</span>
            <h1>Offline Downloads</h1>
            <p>Your saved videos, ready to watch anytime.</p>
          </div>

          <label className={`downloads-import ${saving ? "disabled" : ""}`}>
            {saving ? "Saving..." : "+ Import Video"}
            <input
              type="file"
              accept="video/*"
              onChange={handleImport}
              disabled={saving}
              hidden
            />
          </label>
        </div>

        <section className="downloads-stats">
          <div>
            <span>Saved Videos</span>
            <strong>{videos.length}</strong>
          </div>
          <div>
            <span>Total Size</span>
            <strong>{formatSize(totalSize)}</strong>
          </div>
        </section>

        {selectedVideo && (
          <section className="offline-player">
            <div className="offline-player-heading">
              <h2>{selectedVideo.title}</h2>
              <button onClick={() => setSelectedVideo(null)}>Close</button>
            </div>

            <video
              key={selectedVideo.id}
              src={selectedVideoUrl}
              controls
              autoPlay
              playsInline
            />
          </section>
        )}

        <section className="downloads-library">
          <h2>Your Library</h2>

          {loading ? (
            <p className="downloads-empty">Loading your library...</p>
          ) : videos.length === 0 ? (
            <div className="downloads-empty">
              <span className="downloads-empty-icon">↓</span>
              <h3>No videos saved yet</h3>
              <p>Import a video file you own or have permission to download.</p>
            </div>
          ) : (
            <div className="downloads-grid">
              {videos.map((video) => (
                <article className="download-card" key={video.id}>
                  <div className="download-card-icon">▶</div>

                  <div className="download-card-info">
                    <h3 title={video.title}>{video.title}</h3>
                    <p>
                      Episode {video.episodeNumber} · {formatSize(video.size)}
                    </p>
                    <span>
                      Saved {new Date(video.savedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="download-card-actions">
                    <button onClick={() => setSelectedVideo(video)}>
                      Watch
                    </button>
                    <button
                      className="download-delete"
                      onClick={() => handleDelete(video.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Downloads;
