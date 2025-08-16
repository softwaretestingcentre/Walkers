import React from "react";
import "./App.css";
import "./MinutesSection.css";
import "./celtic-font.css";

import MinutesSection from "./MinutesSection";
import issuesList from "./issuesList";
import peerReviewModelPanel from "./peerReviewModelPanel";
import rightPanels from "./rightPanels";
import sections from "./sections";
import CollapsiblePanel from "./CollapsiblePanel";

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
  setMeetingDate(getToday());
  }, []);

  const handleDateSave = () => {
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

  // Get all dates with notes from backend only
  const getAllDatesWithNotes = async () => {
    try {
      const res = await fetch('/.netlify/functions/listDates');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.dates)) {
          return data.dates.sort().reverse();
        }
      }
    } catch {
      // ignore fetch errors
    }
    return [];
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
  const [notesKey, setNotesKey] = React.useState(0);
  const handleSelectDate = async (date) => {
    setLoadingNotes(true);
    await Promise.all(sections.map(async (section, idx) => {
      // Always clear the section first
      if (sectionRefs.current[idx]) sectionRefs.current[idx].value = "";
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
        // ignore fetch errors
      }
      // If not found, section remains cleared
    }));
    setMeetingDate(date);
    setNotesKey(k => k + 1); // force re-render
    setShowNotesModal(false);
    setLoadingNotes(false);
  };


  // Add state for selected issue/topic for Group & Pair Journeying
  const [selectedIssue, setSelectedIssue] = React.useState("");

  // Add state for next session date/time (for Set Next Session section)
  const [nextSessionDate, setNextSessionDate] = React.useState("");
  const [nextSessionTime, setNextSessionTime] = React.useState("");

  // Add state for API/database error
  const [dbError, setDbError] = React.useState(false);

  // Save all notes for the current date
  const handleSaveAll = async () => {
    setDbError(false); // reset error state
    const savePromises = sections.map((section, idx) => {
      let value = sectionRefs.current[idx]?.value || "";
      // For Group & Pair Journeying, prepend selected issue/topic if set
      if (section.id === 4 && selectedIssue) {
        value = `${selectedIssue}\n${value}`;
      }
      // For Set Next Session, include date and time if set
      if (section.id === 8) {
        value = `${nextSessionDate} ${nextSessionTime}\n${value}`;
      }
      // Only save if there is some content (non-empty string after trimming)
      if (!value || value.trim() === "") return null;
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
      });
    }).filter(Boolean);
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
          {sections.map((section, idx) => {
            const extraProps = {};
            if (section.id === 4) extraProps.selectedIssue = selectedIssue;
            if (section.id === 8) {
              extraProps.nextSessionDate = nextSessionDate;
              extraProps.setNextSessionDate = setNextSessionDate;
              extraProps.nextSessionTime = nextSessionTime;
              extraProps.setNextSessionTime = setNextSessionTime;
            }
            return (
              <React.Fragment key={section.id}>
                <MinutesSection
                  key={notesKey + '-' + section.id}
                  section={section}
                  meetingDate={meetingDate}
                  textareaRef={el => (sectionRefs.current[idx] = el)}
                  {...extraProps}
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
            );
          })}
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
              Warning: Could not save to the database. Please try again later.
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
