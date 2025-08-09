import React, { useState, useEffect } from "react";
import "./MinutesSection.css";

function MinutesSection({ section }) {
  const storageKey = `minutes-section-${section.id}`;
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedText = localStorage.getItem(storageKey);
    if (savedText) setText(savedText);
  }, [storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  // Slugify the section title for a unique, readable id
  const slug = section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Add date/time picker for 'Set Next Session' section
  const isSetNextSession = slug === 'set-next-session';
  const [nextSessionDate, setNextSessionDate] = useState("");
  const [nextSessionTime, setNextSessionTime] = useState("");

  // Load next session date/time from localStorage
  useEffect(() => {
    if (isSetNextSession) {
      const d = localStorage.getItem('next-session-date');
      const t = localStorage.getItem('next-session-time');
      if (d) setNextSessionDate(d);
      if (t) setNextSessionTime(t);
    }
  }, [isSetNextSession]);

  const handleNextSessionSave = () => {
    localStorage.setItem('next-session-date', nextSessionDate);
    localStorage.setItem('next-session-time', nextSessionTime);
    handleSave();
  };

  return (
    <div className="minutes-section">
      <h2 className="heading-celtic">{section.title}</h2>
      <p className="prompt">{section.prompt}</p>
      {isSetNextSession && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <label htmlFor="next-session-date" style={{ fontWeight: 600 }}>Date:</label>
          <input
            id="next-session-date"
            type="date"
            value={nextSessionDate}
            onChange={e => setNextSessionDate(e.target.value)}
            style={{ fontSize: '1rem', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid #bfc4d1', background: '#fff', color: '#2a3a5a' }}
          />
          <label htmlFor="next-session-time" style={{ fontWeight: 600 }}>Time:</label>
          <input
            id="next-session-time"
            type="time"
            value={nextSessionTime}
            onChange={e => setNextSessionTime(e.target.value)}
            style={{ fontSize: '1rem', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid #bfc4d1', background: '#fff', color: '#2a3a5a' }}
          />
        </div>
      )}
      <textarea
        id={`minutes-section-${slug}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Record notes here..."
      />
      <button onClick={isSetNextSession ? handleNextSessionSave : handleSave} className="save-btn">
        Save
      </button>
      {saved && <span className="saved-msg">Saved!</span>}
    </div>
  );
}

export default MinutesSection;
