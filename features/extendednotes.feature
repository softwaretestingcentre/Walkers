Feature: Meeting notes app extended functionality
  # Section CRUD and validation

  @regression
  Scenario Outline: User saves and loads notes in a section
    Given Walker is viewing the meeting notes for date "<date>"
    When Walker enters "<input>" in the "<section>" section
    And Walker saves the "<section>" section
    Then the notes in the "<section>" section should be "<expected>" after reload

    Examples:
      | date       | section               | input                         | expected                      |
      | 2025-10-05 | Hallowing the Meeting | "Some updated notes"          | "Some updated notes"          |
      | 2025-10-04 | Hallowing the Meeting | "😀✨漢字"                      | "😀✨漢字"                      |
      | 2025-10-04 | Hallowing the Meeting | "<script>alert('x')</script>" | "<script>alert('x')</script>" |

  Scenario Outline: User cannot save invalid notes
    Given Walker is viewing the meeting notes for date "<date>"
    When Walker enters "<input>" in the "<section>" section
    And Walker saves the "<section>" section
    Then an error message should be shown for the "<section>" section

    Examples:
      | date       | section               | input      |
      | 2025-10-04 | Hallowing the Meeting | ""         |

  Scenario: User sees all meeting sections
    Given Walker is viewing the meeting notes for date "2025-09-26"
    Then Walker should see all meeting sections with headings, editable text areas, and a Save button for each

  Scenario: User views notes for a different date
    Given Walker is viewing the meeting notes for date "2025-09-26"
    When Walker selects the date "2025-08-09"
    Then the notes for date "2025-08-09" should be displayed in all sections

  Scenario: Notes are loaded from localStorage
    Given Walker has previously saved notes for date "2025-09-21"
    When Walker selects the date "2025-09-21"
    Then the notes for date "2025-08-09" should be displayed in all sections
  # UI and panel behaviour

  @Performance
  Scenario: Peer Review Model panel expands and collapses
    Given Walker is viewing the meeting notes for date "2025-09-26"
    When Walker toggles the "Peer-Review Model for Groups" panel
    Then the "Peer-Review Model for Groups" panel should be expanded
    When Walker toggles the "Peer-Review Model for Groups" panel
    Then the "Peer-Review Model for Groups" panel should be collapsed
  # Batch save

  @regression @save-all
  Scenario: Save the entire form
    Given Walker is viewing the meeting notes for date "2025-10-04"
    When Walker enters "Agenda updated" in the "Agenda" section
    And Walker enters "Decisions recorded" in the "Decisions" section
    And Walker saves the entire form
    Then both the "Agenda" section and the "Decisions" section contain their respective saved text
    # Action: verify batch save persists all sections atomically
  # Autosave

  # Concurrency

  @regression @concurrency
  Scenario: Concurrent edits from two tabs - last write wins
    Given Walker opens the notes for date "2025-10-04" in two separate tabs
    When In tab A Walker enters "Note from A" in the "Hallowing the Meeting" section and saves
    And In tab B Walker enters "Note from B" in the "Hallowing the Meeting" section and saves
    Then the app shows the content from the last saved tab as authoritative
    # Concurrency: document expected behaviour is last-write-wins; note if app implements merge
  # Offline edit

  @regression @offline-edit
  Scenario: Edit offline and sync when back online
    Given Walker opens the app and goes offline
    When Walker edits the "Hallowing the Meeting" section to "Offline edit" and clicks save
    And Walker returns online
    Then the app synchronises the offline edits to the server
    # Edge case: conflict resolution and user notification on sync
  # Export/import

  # Accessibility

  # Security

  @regression @xss
  Scenario: Prevent XSS in saved notes
    Given Walker is viewing the meeting notes for date "2025-10-04"
    When Walker enters "<script>alert('x')</script>" in the "Hallowing the Meeting" section
    And Walker saves the "Hallowing the Meeting" section
    Then the app stores the content but does not execute embedded scripts when displayed
    # Security: ensure saved content is escaped or sanitised when rendered
  # Performance

  @regression @large-note
  Scenario: Handle very large notes gracefully
    Given Walker is viewing the meeting notes for date "2025-10-04"
    When Walker pastes a 1MB text payload into the "Hallowing the Meeting" section
    And Walker saves the "Hallowing the Meeting" section
    Then the app accepts the large payload and the UI remains responsive
    # Performance: large inputs should not block the UI or crash the app
