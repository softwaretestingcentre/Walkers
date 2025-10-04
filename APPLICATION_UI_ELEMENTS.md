# Application UI Elements Guide

This document describes the purpose and behavior of the visible UI elements in the Walkers Peer Review Group Meeting Minutes application.

## Global Layout
- **Left Sidebar (Collapsible Panels)**: Provides contextual guidance ("Peer-Review Model for Groups"). Can be expanded/collapsed to save space.
- **Right Sidebar (Collapsible Panels)**: Provides additional guidance lists (e.g., "How Peer Review Serves Our Practice" and other appraisal guidance). Each panel toggles independently.
- **Main Content Area**: Contains the meeting heading, date controls, modal trigger, the nine editable minutes sections, and the bulk save control.

## Header / Meeting Metadata
- **Main Heading**: "Walkers Between the Worlds" and subheading "Peer Review Group Meeting" — purely informational branding.
- **Meeting Date Input (type=date)**:
  - Auto-populated with today’s date on first load.
  - Changing this date updates which set of minutes you are viewing/editing.
  - Does not auto-save; requires pressing the adjacent Save button for visual confirmation only (current logic stores date in component state; the Save button gives user feedback rather than persisting anything separately).
- **Save (Date) Button**:
  - When clicked, briefly shows a “Saved!” confirmation message for the meeting date selection.
  - Does not trigger any network request itself (it does not save notes—only acknowledges the date selection).
- **View Notes Button**:
  - Opens a modal dialog to select from previously saved dates (fetched from the backend via `listDates` serverless function).
  - Allows quick loading of all section contents for a past meeting date.

## View Notes Modal
- **Modal Container**: Overlays the page and blocks interaction with the main form until closed.
- **Title: "View Notes by Date"**: Indicates historical retrieval mode.
- **Dates List**: Each date is rendered as a button (sorted newest first). Selecting one:
  - Fetches content per section for that date via `getMinutes` endpoint.
  - Populates each section’s textarea with the latest saved content for that date.
  - Closes the modal when loading completes.
- **Loading Indicator ("Loading dates...")**: Shown while awaiting the date list.
- **No Saved Notes Message**: Displays if no dates are returned.
- **Close Button**: Dismisses the modal without changing the current in-progress notes.

## Minutes Sections (9 Total)
Each section is defined in `sections.js` with:
- **Title (h2)**: Name of the focus area (e.g., "Hallowing the Meeting").
- **Prompt Paragraph**: Guidance describing what to record for that section.
- **Textarea**:
  - Editable region for entering notes.
  - Initially shows a placeholder: "Record notes here...".
  - On meeting date change, attempts to load saved content for that date/section.
  - While loading, replaced by a "Loading..." message.
- **Save Button (per section)**:
  - Saves only that section’s textarea content to the backend via `saveMinutes` serverless function.
  - Prepends contextual lines in special cases (see below) before sending.
- **Saved! Indicator**:
  - Temporarily appears after a successful (or attempted) save.
- **Error Message ("Failed to save notes.")**:
  - Appears in red if the network request fails for that section.

### Special Behaviors
1. **Group & Pair Journeying (Section id=4 internally, slug: group-pair-journeying)**:
   - If a topic is selected in the topic dropdown (see below), that topic line is prepended to the content on save.
2. **Set Next Session (Section id=8 internally, slug: set-next-session)**:
   - If both a next session date and time are provided, a line in the format `YYYY-MM-DD HH:MM` is prepended to the saved content.

## Topic Selection for Group & Pair Journeying
- **Dropdown Label**: "Topic for Group & Pair Journeying:".
- **Select Control**:
  - Populated from `issuesList.js`.
  - Appears after the "Circle Animal/Spirit" section but influences saving behavior of the following "Group & Pair Journeying" section.
  - Selected value is injected as the first line of that section’s saved notes (followed by a newline and the user’s text).
  - If no topic is selected, no topic line is added.

## Set Next Session Enhancements
- **Date Input (Next Session Date)** & **Time Input (Next Session Time)**:
  - Displayed only within the "Set Next Session" section (above its textarea).
  - If both are populated at save time, they are combined (`<date> <time>`) and placed as the first line of the saved notes.
  - If either is missing, no prepended date/time line is stored.

## Bulk Save Control
- **Save Entire Form Button**:
  - Iterates through all sections and sends save requests for each non-empty textarea.
  - Applies the same prepend rules (topic, next session date/time) where relevant.
  - Displays a global success message: "All notes saved!" that auto-dismisses.
  - If one or more save operations fail, a warning banner may appear (see below).

## Status & Feedback Elements
- **Section-Level "Saved!" Badges**: Provide immediate confirmation for individual saves.
- **Global Bulk Save Message**: Temporary message near the bulk save button.
- **Warning Banner (Database Error)**:
  - Text: "Warning: Could not save to the database. Please try again later." (Appears if any save in a bulk operation triggers a catch path setting `dbError`.)
  - Styled for high visibility (red-themed background and border).
- **Silent Fetch Failures on Load**: Initial content loads that fail do not surface a visible error (design choice: fail quietly and leave the textarea empty).

## Collapsible Panels
- **Toggle Button**: Displays an arrow (► when collapsed, ▼ when expanded) plus panel title.
- **Panel Body**: Contains unordered list items. Each list item includes:
  - A decorative icon (triskel image from `/triskel-pattern.svg`).
  - Text content from the corresponding panel data file.
- **Independent State**: Each panel opens/closes without affecting others.

## Icons & Visual Elements
- **Triskel Symbol (`/triskel-pattern.svg`)**: Used as a bullet-like decorative element in panel lists.
- **Typography / Styling**: Implemented via CSS files (`App.css`, `MinutesSection.css`, `celtic-font.css`) to provide thematic look and readability.

## Network Interactions (Relevant to UI Behavior)
- **GET `/.netlify/functions/getMinutes?section=...&date=...&all=true`**: Used on date change or initial mount per section to load latest content.
- **GET `/.netlify/functions/listDates`**: Used when opening the View Notes modal to list available saved dates.
- **POST `/.netlify/functions/saveMinutes`**: Used for both single-section and bulk form saves.

## Loading & Refresh Logic
- **Per-Section Loading State**: Each section shows a "Loading..." placeholder until its fetch attempt completes for the active meeting date.
- **Date Switching**: Changing the meeting date triggers a re-fetch for each section (clearing previous unsaved edits for the old date).
- **Modal Date Selection**: Selecting a date in the modal explicitly replaces all current textareas with content associated with that earlier date.

## Error Handling Summary
| Context                       | Visible UI Effect                            | Notes |
|------------------------------|-----------------------------------------------|-------|
| Section save failure         | Inline red error text                         | Only on save, not on load |
| Bulk save partial failures   | Red warning banner below form                 | Banner persists until next interaction (state-driven) |
| Section load failure         | Silent (textarea empty after Loading... ends) | Intentional silent catch |
| Date list load failure       | Shows empty list -> "No saved notes found."   | Fallback condition |

## Persistence Model (UI Perspective)
- The interface always reflects the combination of current meeting date + fetched stored notes.
- Unsaved changes are not cached once the date is changed (textareas are reloaded/cleared).
- Enhancers (topic choice, next session date/time) modify the content only at save time (they aren’t retroactively parsed back out on load; the prepended lines become part of stored content).

## Accessibility / Identifiers
- Textareas have IDs derived from slugified section titles (e.g., `minutes-section-hallowing-the-meeting`).
- Collapsible panel buttons are focusable and toggled with standard click interactions.

## Summary of User Flow
1. User loads app (today’s date pre-filled; sections load any existing notes for today).
2. User edits one or more sections, optionally picks a topic and/or sets next session date/time.
3. User saves sections individually or uses bulk save.
4. User can later open the View Notes modal, pick a past date, and review or update prior notes.
5. Sidebars provide static reference material supporting the meeting’s peer review and appraisal processes.

---
This document should help developers, testers, and end users understand how each UI component behaves and how they interrelate with the application’s data and state.
