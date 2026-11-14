import React, { useState } from "react";
import {
  BugOutlined,
  CloseOutlined,
  SendOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import "./BugReporter.css";

const BugReporter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("Playback");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    const report = {
      id: `BUG-${Date.now()}`,
      category,
      title: title.trim(),
      description: description.trim(),
      page: window.location.pathname,
      createdAt: new Date().toISOString(),
    };

    try {
      const reports = JSON.parse(
        localStorage.getItem("senpaiflix_bug_reports") || "[]"
      );

      if (!Array.isArray(reports)) {
        throw new Error("Invalid report storage");
      }

      reports.push(report);
      localStorage.setItem(
        "senpaiflix_bug_reports",
        JSON.stringify(reports)
      );

      setSubmitted(true);
      setTitle("");
      setDescription("");
    } catch {
      setError("Could not save your report. Please try again.");
    }
  };

  const closeReporter = () => {
    setIsOpen(false);
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="bug-reporter">
      <button
        className="bug-floating-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Report a bug"
        title="Report a bug"
      >
        {isOpen ? <CloseOutlined /> : <BugOutlined />}
        {!isOpen && <span className="bug-button-tooltip">Report a bug</span>}
      </button>

      {isOpen && (
        <section className="bug-window" aria-label="Bug report form">
          <header className="bug-window-header">
            <div className="bug-header-icon">
              <BugOutlined />
            </div>
            <div className="bug-header-text">
              <h3>Report a Bug</h3>
              <p>Help us improve SenpaiFlix</p>
            </div>
            <button
              className="bug-close-button"
              onClick={closeReporter}
              aria-label="Close"
            >
              <CloseOutlined />
            </button>
          </header>

          {submitted ? (
            <div className="bug-success">
              <CheckCircleFilled />
              <h3>Report Saved!</h3>
              <p>Thanks for helping us improve SenpaiFlix.</p>
              <button onClick={closeReporter}>Done</button>
            </div>
          ) : (
            <form className="bug-form" onSubmit={handleSubmit}>
              <label htmlFor="bug-category">Bug Category</label>
              <select
                id="bug-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Playback</option>
                <option>Anime Content</option>
                <option>UI / Design</option>
                <option>Login / Account</option>
                <option>Performance</option>
                <option>Other</option>
              </select>

              <label htmlFor="bug-title">What went wrong?</label>
              <input
                id="bug-title"
                type="text"
                placeholder="Short bug title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                required
              />

              <label htmlFor="bug-description">Describe the issue</label>
              <textarea
                id="bug-description"
                placeholder="Tell us what happened and how to reproduce it..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1500}
                rows={4}
                required
              />

              <div className="bug-form-footer">
                <span>{description.length}/1500</span>
                <button type="submit">
                  <SendOutlined />
                  Submit Report
                </button>
              </div>

              {error && <p className="bug-error">{error}</p>}

              <p className="bug-privacy-note">
                Your report is saved locally in this browser.
              </p>
            </form>
          )}
        </section>
      )}
    </div>
  );
};

export default BugReporter;
