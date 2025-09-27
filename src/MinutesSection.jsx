


import React, { useState, useEffect } from "react";
import "./MinutesSection.css";
import { slugify } from "./utils";

const NextSessionFields = ({ nextSessionDate, setNextSessionDate, nextSessionTime, setNextSessionTime }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
    <label htmlFor="next-session-date" style={{ fontWeight: 600 }}>Date:</label>
    <input
      id="next-session-date"
      type="date"
      value={nextSessionDate}
      onChange={e => setNextSessionDate(e.target.value)}
      style={{ fontSize: '1rem', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid #bfc4d1', background: 'rgb(224, 221, 210)', color: '#2a3a5a' }}
    />
    <label htmlFor="next-session-time" style={{ fontWeight: 600 }}>Time:</label>
    <input
      id="next-session-time"
      type="time"
      value={nextSessionTime}
      onChange={e => setNextSessionTime(e.target.value)}
      style={{ fontSize: '1rem', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid #bfc4d1', background: 'rgb(224, 221, 210)', color: '#2a3a5a' }}
    />
  </div>
);

function MinutesSection({ section, meetingDate, selectedIssue, nextSessionDate, setNextSessionDate, nextSessionTime, setNextSessionTime, textareaRef }) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slug = slugify(section.title);
  const isSetNextSession = slug === 'set-next-session';

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await fetch(`/.netlify/functions/getMinutes?section=${encodeURIComponent(section.title)}&date=${encodeURIComponent(meetingDate)}&all=true`);
        if (res.ok) {
          const data = await res.json();
          if (data.date === meetingDate) {
            setText(data.content || "");
          }
        }
      } catch {
        // ignore fetch errors
      }
      setLoading(false);
    };
    fetchSection();
  }, [meetingDate, section.title]);

  const handleSave = async () => {
    setSaved(false);
    setError(null);
    let contentToSave = text;
    if (slug === "group-pair-journeying" && selectedIssue) {
      contentToSave = `${selectedIssue}\n${text}`;
    }
    if (isSetNextSession && nextSessionDate && nextSessionTime) {
      contentToSave = `${nextSessionDate} ${nextSessionTime}\n${text}`;
    }
    try {
      const res = await fetch("/.netlify/functions/saveMinutes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: section.title, content: contentToSave, date: meetingDate }),
      });
      if (!res.ok) throw new Error("API error");
    } catch {
      setError("Failed to save notes.");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="minutes-section">
      <h2 className="heading-celtic">{section.title}</h2>
      <p className="prompt">{section.prompt}</p>
      {isSetNextSession && (
        <NextSessionFields
          nextSessionDate={nextSessionDate}
          setNextSessionDate={setNextSessionDate}
          nextSessionTime={nextSessionTime}
          setNextSessionTime={setNextSessionTime}
        />
      )}
      {loading ? (
        <div style={{ color: '#888', fontStyle: 'italic', margin: '1em 0' }}>Loading...</div>
      ) : error ? (
        <div style={{ color: '#a33', fontWeight: 600, margin: '1em 0' }}>{error}</div>
      ) : (
        <>
          <textarea
            id={`minutes-section-${slug}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Record notes here..."
            ref={textareaRef}
          />
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          {saved && <span className="saved-msg">Saved!</span>}
        </>
      )}
    </div>
  );
}


export default MinutesSection;
