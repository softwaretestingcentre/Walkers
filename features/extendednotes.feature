Feature: Meeting notes app extended functionality

  Scenario: User edits and saves meeting notes
    Given Walker is viewing the meeting notes for date "2025-10-04"
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
