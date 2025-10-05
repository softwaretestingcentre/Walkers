Feature: Meeting notes app extended functionality

  Background:
    Given Walker is viewing the meeting notes for date "<date>"

  @regression
  Scenario Outline: Notes persist after update
    When Walker enters "<input>" in the "<section>" section
    Then the "<section>" notes persist as "<expected>"

    Examples:
      | date       | section               | input                       | expected                    |
      | 2025-10-05 | Hallowing the Meeting | Some updated notes          | Some updated notes          |
      | 2025-10-04 | Hallowing the Meeting | 😀✨漢字                      | 😀✨漢字                      |
      | 2025-10-04 | Hallowing the Meeting | <script>alert('x')</script> | <script>alert('x')</script> |

  Scenario Outline: Invalid notes are rejected
    When Walker enters "<input>" in the "<section>" section
    Then an error is shown for the "<section>" notes

    Examples:
      | date       | section               | input |
      | 2025-10-04 | Hallowing the Meeting |       |

  Scenario: All meeting sections are visible
    Then all meeting sections are shown with headings, editable areas, and a Save button for each

  Scenario: Notes for a different date are displayed
    When Walker selects the date "2025-08-09"
    Then the notes for date "2025-08-09" are displayed in all sections

  Scenario: Previously saved notes are loaded
    Given Walker has previously saved notes for date "2025-09-21"
    When Walker selects the date "2025-09-21"
    Then the notes for date "2025-09-21" are displayed in all sections

  @Performance
  Scenario: Peer Review Model panel expands and collapses
    When Walker expands the "Peer-Review Model for Groups" panel
    Then the "Peer-Review Model for Groups" panel is expanded
    When Walker collapses the "Peer-Review Model for Groups" panel
    Then the "Peer-Review Model for Groups" panel is collapsed

  @regression @save-all
  Scenario: Save all sections at once
    When Walker enters "Agenda updated" in the "Agenda" section
    And Walker enters "Decisions recorded" in the "Decisions" section
    And Walker saves all notes
    Then the "Agenda" notes persist as "Agenda updated"
    And the "Decisions" notes persist as "Decisions recorded"
    # Action: verify batch save persists all sections atomically
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
    When Walker enters "Offline edit" in the "Hallowing the Meeting" section
    And Walker saves the "Hallowing the Meeting" section
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
