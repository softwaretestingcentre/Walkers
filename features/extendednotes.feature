Feature: Meeting notes app extended functionality

  Scenario: User edits and saves meeting notes
    Given Walker is viewing the meeting notes for date "2025-10-05"
    When Walker enters "Some updated notes" in the "Hallowing the Meeting" section
    And Walker clicks the "Save" button for the "Hallowing the Meeting" section
    Then the notes in the "Hallowing the Meeting" section should be "Some updated notes" after reload

    Scenario: User sees all 9 meeting sections
      Given Walker is on the main page
      Then Walker should see 9 meeting sections with headings, editable text areas, and a "Save" button for each

    Scenario: User cannot save empty notes
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker enters "" in the "Hallowing the Meeting" section
      And Walker clicks the "Save" button for the "Hallowing the Meeting" section
      Then an error message should be shown for the "Hallowing the Meeting" section

    Scenario: User views notes for a different date
      Given Walker is viewing the meeting notes for date "2025-09-26"
      When Walker selects the date "2025-08-09"
      Then the notes for date "2025-08-09" should be displayed in all sections

    @Performance
    Scenario: Peer Review Model panel expands and collapses
      Given Walker is on the main page
      When Walker toggles the "Peer-Review Model for Groups" panel
      Then the "Peer-Review Model for Groups" panel should be expanded
      When Walker toggles the "Peer-Review Model for Groups" panel
      Then the "Peer-Review Model for Groups" panel should be collapsed

    Scenario: Notes are loaded from localStorage
      Given Walker has previously saved notes for date "2025-09-21"
      When Walker selects the date "2025-09-21"
      Then the notes for date "2025-09-21" should be loaded from localStorage and displayed

    Scenario: User saves notes at maximum allowed length
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker enters a note of maximum allowed length in the "Hallowing the Meeting" section
      And Walker clicks the "Save" button for the "Hallowing the Meeting" section
      Then the notes in the "Hallowing the Meeting" section should be the maximum allowed length after reload
    # Edge case: Save with maximum length notes

    Scenario: User cannot save notes with only whitespace
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker enters only whitespace in the "Hallowing the Meeting" section
      And Walker clicks the "Save" button for the "Hallowing the Meeting" section
      Then an error message should be shown for the "Hallowing the Meeting" section
    # Validation: Save with only whitespace

    Scenario: User deletes all notes for a date
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker clears all sections and clicks "Save" for each section
      Then all notes for date "2025-10-04" should be empty after reload
    # Lifecycle: Delete all notes for a date

    Scenario: User sees error if saving notes fails
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When the backend API is unavailable and Walker clicks the "Save" button for the "Hallowing the Meeting" section
      Then an error message should be shown for the "Hallowing the Meeting" section
    # Error handling: API failure on save

    Scenario: User saves notes with special characters
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker enters "😀✨漢字" in the "Hallowing the Meeting" section
      And Walker clicks the "Save" button for the "Hallowing the Meeting" section
      Then the notes in the "Hallowing the Meeting" section should be "😀✨漢字" after reload
    # Compatibility: Save notes with special characters

    @regression @save-all
    Scenario: Save the entire form
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker enters "Agenda updated" in the "Agenda" section
      And Walker enters "Decisions recorded" in the "Decisions" section
      And Walker clicks the "Save Entire Form" button
      Then both the "Agenda" section and the "Decisions" section contain their respective saved text
      # Action: verify batch save persists all sections atomically

    @regression @autosave
    Scenario: Autosave triggers after inactivity
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker types "Draft note" in the "Hallowing the Meeting" section and is idle for 3 seconds
      Then the app autosaves the draft for the "Hallowing the Meeting" section
      # Behaviour: autosave interval should be non-intrusive and recoverable

    @regression @concurrency
    Scenario: Concurrent edits from two tabs - last write wins
      Given Walker opens the notes for date "2025-10-04" in two separate tabs
      When In tab A Walker enters "Note from A" in the "Hallowing the Meeting" section and saves
      And In tab B Walker enters "Note from B" in the "Hallowing the Meeting" section and saves
      Then the app shows the content from the last saved tab as authoritative
      # Concurrency: document expected behaviour is last-write-wins; note if app implements merge

    @regression @offline-edit
    Scenario: Edit offline and sync when back online
      Given Walker opens the app and goes offline
      When Walker edits the "Hallowing the Meeting" section to "Offline edit" and clicks save
      And Walker returns online
      Then the app synchronises the offline edits to the server
      # Edge case: conflict resolution and user notification on sync

    @regression @export-import
    Scenario: Export and import notes as JSON
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker clicks the "Export JSON" button
      Then a downloadable JSON file is created containing the current notes
      When Walker clears the form and then imports the previously exported JSON
      Then the form is restored from the imported JSON
      # Feature: export/import is useful for backups and migrations

    @regression @a11y
    Scenario: Keyboard accessibility for save controls
      Given Walker focuses the "Hallowing the Meeting" section textarea
      When Walker presses the keyboard shortcut to save (e.g., Ctrl+S)
      Then the app saves the focused section
      # Accessibility: keyboard-only users must be able to save without mouse

    @regression @xss
    Scenario: Prevent XSS in saved notes
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker enters "<script>alert('x')</script>" in the "Hallowing the Meeting" section
      And Walker clicks the "Save" button for the "Hallowing the Meeting" section
      Then the app stores the content but does not execute embedded scripts when displayed
      # Security: ensure saved content is escaped or sanitised when rendered

    @regression @large-note
    Scenario: Handle very large notes gracefully
      Given Walker is viewing the meeting notes for date "2025-10-04"
      When Walker pastes a 1MB text payload into the "Hallowing the Meeting" section
      And Walker clicks the "Save" button for the "Hallowing the Meeting" section
      Then the app accepts the large payload and the UI remains responsive
      # Performance: large inputs should not block the UI or crash the app
