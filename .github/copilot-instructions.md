
# Project Goals
This project is a Vite React app for recording and saving editable minutes from meetings. The main page should have 9 sections, each corresponding to a bullet point from the 'Suggested Initial Work' section. Each section should have an editable text area and a save button. Use localStorage for persistence. Style the app for clarity and usability.

# How to work with this project
Important! Always re-read these instructions before starting work and report any changes made to the instructions in the chat.
Information about the application UI can be found in APPLICATION_UI_ELEMENTS.md. This file should be checked for changes before attempting to run any test scenarios.

# chrome devtools mcp instructions
Use the Chrome DevTools MCP server to manually test the features described in the feature files located in the `features` folder of the repository.
Important! Always re-read the feature file before testing any scenarios in the feature. They will be updated frequently.
Always start by navigating to the home page of the website https://walkersppr.netlify.app/
Always use a fresh browser tab for each feature
Always wait up to 5 seconds for the UI to respond
If the UI is unresponsive to clicks, try alternative approaches such as keyboard navigation or scripted interactions
Take a fresh snapshot of the page after significant layout shifts or network traffic
Do not click save buttons unless instructed

# Testing the scenarios
Do not attempt to install or use a test framework, simply follow the instructions and use the devtools to test the features
Use feature files as instructions to interact with the website
Perform all scenarios as individual cucumber tests
If the scenario is tagged with "@Performance", start a performance trace when running a feature and report it at the end
Treat any failure to find the expected content as a test failure
Intent matches are considered as test passes
Report any console errors at the end of the tests
When running multiple scenarios, do not stop for errors, simply log them and continue starting again from the home page

# Test outputs
Write out the test results as a cucumber json file as specified here https://docs.getxray.app/space/XRAYCLOUD/44577176/Import+Execution+Results+-+REST+v2#Cucumber-JSON-Results
