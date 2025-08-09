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

  return (
    <div className="minutes-section">
      <h2 className="heading-celtic">{section.title}</h2>
      <p className="prompt">{section.prompt}</p>
      <textarea
        id={`minutes-section-${slug}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Record notes here..."
      />
      <button onClick={handleSave} className="save-btn">
        Save
      </button>
      {saved && <span className="saved-msg">Saved!</span>}
    </div>
  );
}

export default MinutesSection;
