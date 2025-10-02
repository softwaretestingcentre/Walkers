Feature: Viewing meeting notes

  Scenario: View notes for a specific date
    Given Walker has opened "View Notes"
    When Walker selects the date "2025-09-26"
    Then Walker sees that "Rebecca will open the next session"

  Scenario: Walker has added a solo journey note
    Given Walker has opened "View Notes"
    When Walker selects the date "2025-09-21"
    Then Walker sees their note "Nick - Solo Journey" mentions "Avebury"

  Scenario: Walker checks the model sidebar
    Given Walker has opened "Peer-Review Model for Groups"
    Then Walker can see that it mentions "3 Candles"