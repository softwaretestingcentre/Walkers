import React from "react";

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


export default CollapsiblePanel;
