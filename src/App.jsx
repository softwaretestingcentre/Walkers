
import React from "react";
import "./App.css";
import "./MinutesSection.css";
import "./celtic-font.css";

import MinutesSection from "./MinutesSection";

const issuesList = [
  "Working with Ancestors, being part of a strand of disadvantaged ancestors, but also in the stream of those who lived wisely and with vigour.",
  "Seeing the bigger picture of your own life within the context of land, world and spirit.",
  "Focussing on shrine and daily ritual/ spiritual practice & its rhythms.",
  "Revisiting significant journeys or dreams as a group practice.",
  "Finding better support/ resources for continuing your daily practice.",
  "Nourishing the relationship with your Spirits",
  "Sorting health problems: getting help; allowing help from spirits to flow through your whole life.",
  "Celebrating the integration of journeying with your whole life.",
  "Standing in your power enables you to appreciate others’ gifts more clearly. Explore where you step up, step back, step out, resign.",
  "Shape-shifting in a world that is rapidly changing.",
  "Recognizing resistance to new ideas/methods; better listening as part of the work",
  "Growing closer to allies and spirits whom you work with.",
  "Pilgrimage as part of understanding the larger patterns.",
  "Cutting away what is not working. Housekeeping our practice.",
  "Cultivating simplicity when things become complex.",
  "The leader has laws that keep everyone safe, the herd has families, and every individual has their own honour.  Explore boundaries.",
  "Working on definition and clarity in shamanic work.",
  "Defining yourself in your family/work/professional life.",
  "Giving attention to spaces and boundaries as opportunities to view the world.",
  "Digging deep and bringing forth treasures and help for community issues.",
  "Teaching people how to journey.",
  "Acknowledging the transformation that has already happened in your life: allowing it to root, nourishing the change, and trusting it to grow.",
  "Responding creatively to what has arisen, allowing it to take shape.",
  "Journeying as a group/ journeying in pairs on issues.",
  "Checking overlaps and influences: retaining our safe boundaries.",
  "Deepening your ability to merge with spiritual sources."
];

const peerReviewModelPanel = {
  title: "Peer-Review Model for Groups",
  content: [
    "Standing by each other’s work.",
    "TASK INGREDIENTS. Group work online for each session.",
    "DIRECT WITNESSING: Embodied first-hand experience. (Seen, felt, sensed) Body language",
    "RECORDED EXPERIENCES: Vocal report, written notes, drawing, painting, ritual, our embodiment of the work. Records kept for the group.",
    "SPIRIT WITNESS: From Sharing Together Upholding the 3 Candles which Illuminate every Darkness: TRUTH, NATURE & KNOWLEDGE With clarity, kindness, and understanding",
    "YOUR INGREDIENTS. (What matters to me when someone is looking at my work). Honouring the essence of your craft and service.",
    "OTHER PERSON’S INGREDIENTS. (What matters to me when I am looking at someone else’s work). Honouring the gifts & approaches of other’s craft and service",
    "SUPPORT CREATED: Through Storytelling. Creating an oral contract. Discuss, negotiate and agree. We honour, recognise, appreciate,  celebrate & are inspired by each other’s gifts & strengths. Mirroring & Naming what arises. Feedback that helps bond the group. Pair & group-work that helps extend everyone’s range & confidence."
  ]
};

const rightPanels = [
  {
    title: "How Peer Review Serves Our Practice",
    content: [
      "Doing the right thing. Maintaining ethical practice.",
      "Caring for each other, for clients, for land, community.",
      "Using yourself to the best of your abilities.",
      "Being in groups: learning from others; celebrating with others.",
      "Getting feedback and inspiration from others.",
      "Grounding the story of the work.",
      "Learning from & being inspired by others’ experience and perspectives.",
      "Giving and receiving compassionate and constructive notes without accusation or resentment.",
      "Gate Keeping: checking competence and connective understanding in practice.",
      "Keeping ourselves and our work safe for all concerned.",
      "Using power responsibly, and how to recognise this.",
      "Encouraging others to trust their own power and discrimination to guide their lives.",
      "Appreciating the creative approaches that broaden the work",
      "Acknowledging that things sometimes don’t work, or work-out well.",
      "Brain-storming with a back-up journey to keep things on track.",
      "Working in the presence of spirit.",
      "Enabling others to explore areas where they need to stretch.",
      "Enabling others to find stable modes and models to ground safely.",
      "Supporting each other’s unique contribution to all walks of life."
    ]
  },
  {
    title: "Appraisal in a Group Session",
    content: [
      "In each session, opportunities to appraise yourself and the group work arise.",
      "This is not like the ubiquitous ‘approval ratings’ that are everywhere at present, but rather like listening to the balance of work together as the voice of the spirit wind that sweeps over everything, to gives us breath and inspiration, to clarify and clean what is muddled, and to open a space where we note what has changed, what needs changing, what is in process.",
      "Following this metaphor through the elements, how was the work?",
      "What was warm and supportive? What was uncomfortable or oppressive?",
      "What flowed? What felt stuck, unresolved? What needs cleaning out?",
      "What felt solid and embodied? What didn’t quite come together?",
      "What was inspired? What was unclear? What needs a clearer blueprint?",
      "What was experienced? What changed? What is currently rippling out?",
      "The Three Candles of Spirit: In appraisal, we are sensitive to each other, holding the circle as a sacred meeting where ‘the three candles that illumine every darkness: truth, nature and knowledge’ can burn freely in everyone’s soul cauldrons: reminding us of the needs and requirements of All That Is that we each experience:",
      "Coire Gorias/Cauldron of Warming: our instinct, stability, nourishment, warmth, health, belonging to the physical world with other beings. NATURE.",
      "Coire Ernmae /Cauldron of Vocation: our intuition, gifts, emotional support, exchanges, flexibility, integrity, belonging to the world of ancestors. TRUTH.",
      "Coire Sois/ Cauldron of Knowledge: our insight, understanding, spiritual poise, beliefs, ideas, concepts, belonging to the world of spirit. KNOWLEDGE.",
      "Shamanic Balance and Neutrality: Appraisal is not about expecting perfection, nor an opportunity to criticize yourself or others: it is about shamanic balance and shamanic neutrality: the way our work changes the universe into more harmonious lines, and the way we can get out of the way of ourselves to allow spirit to make those changes. Learning those two things is everything in this work.  We each remain the ‘journey wrangler.’"
    ]
  }
];

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

  // Helper to slugify section titles (same as in MinutesSection)
  const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Save all notes for the current date
  const handleSaveAll = async () => {
    // Save meeting date (local only for now)
    localStorage.setItem("meeting-date", meetingDate);
    // Save all section notes to API in parallel
    const savePromises = sections.map((section, idx) => {
      const slug = slugify(section.title);
      const value = sectionRefs.current[idx]?.value || "";
      // Try API, fallback to localStorage
      return fetch("/.netlify/functions/saveMinutes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: `minutes-section-${section.id}`,
          content: value,
          date: meetingDate
        }),
      }).then(res => {
        if (!res.ok) throw new Error("API error");
      }).catch(() => {
        // Store as JSON string with date for local fallback
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
          <CollapsiblePanel title="Issues & Topics for Peer-Review Work">
          <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
            {issuesList.map((item, i) => (
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
            meetingDate={meetingDate}
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
      </div>
      {/* Right collapsible - sticky */}
      <div className="right-sidebar">
        <div className="sidebar-content">
          {rightPanels.map((panel) => (
          <CollapsiblePanel key={panel.title} title={panel.title}>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
              {panel.content.map((item, j) => {
                // For 'Appraisal in a Group Session', bold headings as in the Notes doc
                let contentNode = item;
                if (panel.title === 'Appraisal in a Group Session') {
                  // Headings from the Notes doc
                  const headings = [
                    'Following this metaphor through the elements, how was the work?',
                    'The Three Candles of Spirit:',
                    'Coire Gorias/Cauldron of Warming:',
                    'Coire Ernmae /Cauldron of Vocation:',
                    'Coire Sois/ Cauldron of Knowledge:',
                    'Shamanic Balance and Neutrality:'
                  ];
                  // If item matches a heading, render bold
                  headings.forEach((h) => {
                    if (item.trim().startsWith(h)) {
                      contentNode = <div><b>{h}</b><span>{item.split(h)[1]}</span></div>;
                    }
                  });
                  
                }
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
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;
