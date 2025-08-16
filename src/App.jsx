import React from "react";
import "./App.css";
import "./MinutesSection.css";
import "./celtic-font.css";

import MinutesSection from "./MinutesSection";
import issuesList from "./issuesList";
import peerReviewModelPanel from "./peerReviewModelPanel";
import rightPanels from "./rightPanels";

function CollapsiblePanel({ title, children, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="collapsible-panel" style={{ marginBottom: '1.2rem', background: '#f3f1e7', borderRadius: 10, boxShadow: '0 1px 6px rgba(80,70,50,0.07)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: '#e0ddd2',
          border: 'none',
          fontWeight: 700,
          fontSize: '1.1rem',
          padding: '0.7rem 1rem',
          cursor: 'pointer',
          color: '#2a3a5a',
          outline: 'none',
        }}
        tabIndex={0}
      >
        {open ? '▼' : '►'} {title}
      </button>
      {open && <div style={{ padding: '0.7rem 1.2rem 1rem 1.2rem' }}>{children}</div>}
    </div>
  );
}

const sections = [
  {
    id: 0,
    title: "Hallowing the Meeting",
    prompt:
      "Find ways to hallow the meeting: how you make your circle, how you open and close it, what is invited and thanked. Note what you need as a group to come together in a sacred way, and what modifications you need. (e.g. Singing together is difficult because it becomes distorted: so the one leading the singing is heard, everyone else mutes and sings the same.)",
  },
  {
    id: 1,
    title: "Sharing Background & Motivations",
    prompt:
      "Share your background and current motivations, so you can better attune to each other, creating aims for work that support everyone. Different people can lead, send out links for meeting up etc.",
  },
  {
    id: 2,
    title: "Mutual Code of Ethics",
    prompt:
      "Journey on creating a mutual code of ethics, and agree on a method of working together e.g. timings that are helpful, preparation needed, etc.",
  },
  {
    id: 3,
    title: "Circle Animal/Spirit",
    prompt:
      "Journey together to find the animal/spirit who holds your circle in their care.",
  },
  {
    id: 4,
    title: "Group & Pair Journeying",
    prompt:
      "Journeying as a group and in pairs on your chosen topic. Journeying as individuals who feedback.",
  },
  {
    id: 5,
    title: "Online Milieu's Spatial Identity",
    prompt:
      "Does your online milieu have a spatial identity? Journey together to understand what kind of spirit place it is: it is still there when you are not meeting together and can be visited.",
  },
  {
    id: 6,
    title: "Secretary & Record Keeping",
    prompt:
      "One person to take responsibility of secretary for each session with an understudy, to record a brief précis of work, to be shared by all. Swap roles regularly, so one person is not responsible every time and becomes swamped.",
  },
  {
    id: 7,
    title: "Session Appraisal",
    prompt:
      "Each session to have time for appraisal of work or your agenda at the end of the session.",
  },
  {
    id: 8,
    title: "Set Next Session",
    prompt:
      "Set clear aims, a date and time for the next session.",
  },
];

function App() {
  // Date state and persistence
  // Helper to get today's date in yyyy-mm-dd format
  const getToday = () => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  };

  const [meetingDate, setMeetingDate] = React.useState("");
  const [dateSaved, setDateSaved] = React.useState(false);

  React.useEffect(() => {
    const savedDate = localStorage.getItem("meeting-date");
    if (savedDate) {
      setMeetingDate(savedDate);
    } else {
      setMeetingDate(getToday());
    }
  }, []);

  const handleDateSave = () => {
    localStorage.setItem("meeting-date", meetingDate);
    setDateSaved(true);
    setTimeout(() => setDateSaved(false), 1200);
  };


  // For saving all notes at once
  const [saveAllMsg, setSaveAllMsg] = React.useState("");
  // Refs to access each textarea value
  const sectionRefs = React.useRef([]);

  // View Notes state
  const [showNotesModal, setShowNotesModal] = React.useState(false);
  const [availableDates, setAvailableDates] = React.useState([]);
  const [loadingDates, setLoadingDates] = React.useState(false);
  const [loadingNotes, setLoadingNotes] = React.useState(false);

  // Find all dates with notes in localStorage
  const getAllDatesWithNotes = async () => {
    const datesSet = new Set();
    // LocalStorage dates
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('minutes-section-')) {
        try {
          const val = JSON.parse(localStorage.getItem(key));
          if (val && val.date) datesSet.add(val.date);
        } catch {
          // ignore JSON parse errors
        }
      }
    }
    // Backend dates
    try {
      const res = await fetch('/.netlify/functions/listDates');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.dates)) {
          data.dates.forEach(date => datesSet.add(date));
        }
      }
    } catch {
      // ignore fetch errors
    }
    return Array.from(datesSet).sort().reverse();
  };

  // Show modal and load available dates
  const handleViewNotes = async () => {
    setLoadingDates(true);
    setShowNotesModal(true);
    const dates = await getAllDatesWithNotes();
    setAvailableDates(dates);
    setLoadingDates(false);
  };

  // Load all notes for a selected date
  const handleSelectDate = async (date) => {
    setLoadingNotes(true);
    // Try to load from API first, fallback to localStorage
    await Promise.all(sections.map(async (section, idx) => {
      // Try API
      try {
        const res = await fetch(`/.netlify/functions/getMinutes?section=${encodeURIComponent(section.title)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.date === date) {
            if (sectionRefs.current[idx]) sectionRefs.current[idx].value = data.content || "";
            return;
          }
        }
      } catch {
        // ignore fetch errors, fallback to localStorage
      }
      // Fallback to localStorage
      const raw = localStorage.getItem(section.title);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.date === date) {
            if (sectionRefs.current[idx]) sectionRefs.current[idx].value = parsed.content || "";
          }
        } catch {
          // ignore JSON parse errors
        }
      }
    }));
    setMeetingDate(date);
    setShowNotesModal(false);
    setLoadingNotes(false);
  };

  // Helper to slugify section titles (same as in MinutesSection)
  const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Add state for selected issue/topic for Group & Pair Journeying
  const [selectedIssue, setSelectedIssue] = React.useState("");

  // Add state for API/database error
  const [dbError, setDbError] = React.useState(false);

  // Save all notes for the current date
  const handleSaveAll = async () => {
    localStorage.setItem("meeting-date", meetingDate);
    setDbError(false); // reset error state
    const savePromises = sections.map((section, idx) => {
      const slug = slugify(section.title);
      let value = sectionRefs.current[idx]?.value || "";
      // For Group & Pair Journeying, prepend selected issue/topic if set
      if (section.id === 4 && selectedIssue) {
        value = `${selectedIssue}\n${value}`;
      }
      // Use section.title as the section column value
      return fetch("/.netlify/functions/saveMinutes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: section.title,
          content: value,
          date: meetingDate
        }),
      }).then(res => {
        if (!res.ok) throw new Error("API error");
      }).catch(() => {
        setDbError(true);
        localStorage.setItem(`minutes-section-${slug}`, JSON.stringify({ content: value, date: meetingDate }));
      });
    });
    await Promise.all(savePromises);
    setSaveAllMsg("All notes saved!");
    setTimeout(() => setSaveAllMsg(""), 1500);
  };

  return (
    <div className="app-layout">
      {/* Left collapsible - sticky */}
      <div className="left-sidebar">
        <div className="sidebar-content">
          {/* Removed Issues & Topics panel from sidebar */}
          <CollapsiblePanel title={peerReviewModelPanel.title}>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
              {peerReviewModelPanel.content.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5em', marginBottom: 6 }}>
                  <img
                    src="/triskel-pattern.svg"
                    alt="triskel"
                    style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, opacity: 0.7 }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CollapsiblePanel>
        </div>
      </div>
      {/* Main form */}
      <div className="main-content">
        <div className="container">
          <div className="heading-stone-bg">
            <h1 className="heading-celtic">Walkers Between the Worlds</h1>
            <h3 className="heading-celtic">Peer Review Group Meeting</h3>
          </div>
        <div className="minutes-section">
          <label htmlFor="meeting-date" style={{ fontWeight: 600, fontSize: '1.1rem' }}>Meeting Date:</label>
          <input
            id="meeting-date"
            type="date"
            value={meetingDate}
            onChange={e => setMeetingDate(e.target.value)}
            style={{
              fontSize: '1.1rem',
              padding: '0.3rem 0.7rem',
              borderRadius: '6px',
              border: '1px solid #bfc4d1',
              background: '#fff',
              color: '#2a3a5a',
            }}
          />
          <button
            onClick={handleDateSave}
            className="save-btn"
            style={{ padding: '0.3rem 1.2rem', fontSize: '1.1rem', marginRight: 8 }}
          >
            Save
          </button>
          <button
            onClick={handleViewNotes}
            className="save-btn"
            style={{ padding: '0.3rem 1.2rem', fontSize: '1.1rem', background: '#e0ddd2', color: '#2a3a5a', border: '1px solid #bfc4d1' }}
          >
            View Notes
          </button>
          {dateSaved && <span className="saved-msg">Saved!</span>}
        </div>

        {/* Modal for viewing notes by date */}
        {showNotesModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '2rem 2.5rem', minWidth: 320, boxShadow: '0 2px 16px rgba(80,70,50,0.13)' }}>
              <h3 style={{ marginTop: 0 }}>View Notes by Date</h3>
              {loadingDates ? (
                <div style={{ color: '#888', fontStyle: 'italic' }}>Loading dates...</div>
              ) : (
                <>
                  {availableDates.length === 0 ? (
                    <div style={{ color: '#a33', fontWeight: 600 }}>No saved notes found.</div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {availableDates.map(date => (
                        <li key={date} style={{ marginBottom: 8 }}>
                          <button
                            style={{ fontSize: '1.05rem', padding: '0.3rem 1.2rem', borderRadius: 6, border: '1px solid #bfc4d1', background: '#f3f1e7', color: '#2a3a5a', cursor: 'pointer' }}
                            onClick={() => handleSelectDate(date)}
                            disabled={loadingNotes}
                          >
                            {date}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
              <div style={{ marginTop: 18, textAlign: 'right' }}>
                <button onClick={() => setShowNotesModal(false)} style={{ fontSize: '1rem', padding: '0.3rem 1.2rem', borderRadius: 6, border: '1px solid #bfc4d1', background: '#eee', color: '#2a3a5a' }}>Close</button>
              </div>
            </div>
          </div>
        )}
        {sections.map((section, idx) => (
          <React.Fragment key={section.id}>
            <MinutesSection
              section={section}
              meetingDate={meetingDate}
              textareaRef={el => (sectionRefs.current[idx] = el)}
              {...(section.id === 4 ? { selectedIssue } : {})}
            />
            {/* Add select element in Group & Pair Journeying section */}
            {section.id === 3 && (
              <div style={{ margin: '1.2rem 0 2rem 0', background: '#f8f7f3', borderRadius: 8, padding: '1.2rem', boxShadow: '0 1px 6px rgba(80,70,50,0.06)' }}>
                <label htmlFor="issues-select" style={{ fontWeight: 600, fontSize: '1.05rem', color: '#2a3a5a', marginBottom: 6, display: 'block' }}>
                  Topic for Group & Pair Journeying:
                </label>
                <select
                  id="issues-select"
                  style={{
                    width: '100%',
                    fontSize: '1.05rem',
                    padding: '0.5rem 0.7rem',
                    borderRadius: 6,
                    border: '1px solid #bfc4d1',
                    background: '#fff',
                    color: '#2a3a5a',
                    marginBottom: 0
                  }}
                  value={selectedIssue}
                  onChange={e => setSelectedIssue(e.target.value)}
                >
                  <option value="" disabled>
                    -- Choose an issue or topic --
                  </option>
                  {issuesList.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}
            {/* Add Appraisal in a Group Session panel inside Session Appraisal section */}
            {section.id === 7 && (
              <CollapsiblePanel title="Appraisal in a Group Session">
                <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                  {rightPanels.find(p => p.title === 'Appraisal in a Group Session').content.map((item, j) => {
                    // Bold headings as in the Notes doc
                    let contentNode = item;
                    const headings = [
                      'Following this metaphor through the elements, how was the work?',
                      'The Three Candles of Spirit:',
                      'Coire Gorias/Cauldron of Warming:',
                      'Coire Ernmae /Cauldron of Vocation:',
                      'Coire Sois/ Cauldron of Knowledge:',
                      'Shamanic Balance and Neutrality:'
                    ];
                    headings.forEach((h) => {
                      if (item.trim().startsWith(h)) {
                        contentNode = <div><b>{h}</b><span>{item.split(h)[1]}</span></div>;
                      }
                    });
                    return (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5em', marginBottom: 6 }}>
                        <img
                          src="/triskel-pattern.svg"
                          alt="triskel"
                          style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, opacity: 0.7 }}
                        />
                        <span>{contentNode}</span>
                      </li>
                    );
                  })}
                </ul>
              </CollapsiblePanel>
            )}
          </React.Fragment>
        ))}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="save-btn" style={{ fontSize: '1.15rem', padding: '0.7rem 2.2rem' }} onClick={handleSaveAll}>
              Save Entire Form
            </button>
            {saveAllMsg && <span className="saved-msg" style={{ marginLeft: '1.2rem' }}>{saveAllMsg}</span>}
          </div>
          {dbError && (
            <div style={{
              background: "#ffeaea",
              color: "#a33",
              border: "1px solid #fbb",
              borderRadius: 6,
              padding: "0.8rem 1.2rem",
              margin: "1rem 0",
              fontWeight: 600
            }}>
              Warning: Could not save to the database. Your notes are saved locally in your browser.
            </div>
          )}
        </div>
      </div>
      {/* Right collapsible - sticky */}
      <div className="right-sidebar">
        <div className="sidebar-content">
          {rightPanels.filter(panel => panel.title !== 'Appraisal in a Group Session').map((panel) => (
            <CollapsiblePanel key={panel.title} title={panel.title}>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                {panel.content.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5em', marginBottom: 6 }}>
                    <img
                      src="/triskel-pattern.svg"
                      alt="triskel"
                      style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, opacity: 0.7 }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CollapsiblePanel>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
