Feature: Security testing for OWASP Top 10 risks
  # Each scenario addresses a key risk from the OWASP Top 10 (2021)

  Scenario: Test for Broken Access Control
    Given the application is in a specific state
    When a user attempts an unauthorized action
    Then access should be denied

  Scenario: Test for Cryptographic Failures
    Given the application is in a specific state
    When sensitive data is stored or transmitted
    Then the data should be protected using strong cryptography

  Scenario: Test for Injection
    When a user submits potentially malicious input
    Then the application should not execute the input and should store it safely

  Scenario: Test for Insecure Design
    Given the application is in a specific state
    Then secure design practices should be documented and followed

  Scenario: Test for Security Misconfiguration
    When the application is deployed
    Then the configuration should not expose unnecessary features or sensitive information

  Scenario: Test for Vulnerable and Outdated Components
    When the application dependencies are reviewed
    Then no components with known vulnerabilities should be present

  Scenario: Test for Identification and Authentication Failures
    When a user attempts to authenticate or maintain a session
    Then authentication and session management should be secure

  Scenario: Test for Software and Data Integrity Failures
    When the application updates or loads plugins
    Then the integrity of code and data should be verified

  Scenario: Test for Security Logging and Monitoring Failures
    When a suspicious or important security event occurs
    Then the event should be logged and an alert generated

  Scenario: Test for Server-Side Request Forgery (SSRF)
    When a user submits a URL to fetch remote content
    Then the application should validate the request and prevent SSRF attacks
