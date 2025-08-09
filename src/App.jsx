
import React from "react";
import "./App.css";
import "./MinutesSection.css";
import "./celtic-font.css";
import MinutesSection from "./MinutesSection";

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
      "One person to take responsibility of secretary for each session with an understudy, to record a brief précis of work, to be shared by all. Swop roles regularly, so one person is not responsible every time and becomes swamped.",
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
      "Set clear aims, dates, and times for next session.",
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

  // Helper to slugify section titles (same as in MinutesSection)
  const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Save all notes for the current date
  const handleSaveAll = () => {
    // Save meeting date
    localStorage.setItem("meeting-date", meetingDate);
    // Save all section notes
    sections.forEach((section, idx) => {
      const slug = slugify(section.title);
      const value = sectionRefs.current[idx]?.value || "";
      localStorage.setItem(`minutes-section-${slug}`, value);
    });
    setSaveAllMsg("All notes saved!");
    setTimeout(() => setSaveAllMsg(""), 1500);
  };

  return (
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
          style={{ padding: '0.3rem 1.2rem', fontSize: '1.1rem' }}
        >
          Save
        </button>
        {dateSaved && <span className="saved-msg">Saved!</span>}
      </div>
      {sections.map((section, idx) => (
        <MinutesSection
          key={section.id}
          section={section}
          textareaRef={el => (sectionRefs.current[idx] = el)}
        />
      ))}
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <button className="save-btn" style={{ fontSize: '1.15rem', padding: '0.7rem 2.2rem' }} onClick={handleSaveAll}>
          Save Entire Form
        </button>
        {saveAllMsg && <span className="saved-msg" style={{ marginLeft: '1.2rem' }}>{saveAllMsg}</span>}
      </div>
    </div>
  );
}

export default App;
