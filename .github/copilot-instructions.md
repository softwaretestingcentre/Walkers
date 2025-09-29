<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This project is a Vite React app for recording and saving editable minutes from meetings. The main page should have 9 sections, each corresponding to a bullet point from the 'Suggested Initial Work' section. Each section should have an editable text area and a save button. Use localStorage for persistence. Style the app for clarity and usability.

chrome-devtools instructions:
The home page of the website is https://walkersppr.netlify.app/
Always re-read the feature file before testing a feature
Always use a fresh browser tab for each feature
Always wait up to 5 seconds for the UI to respond
Take a fresh snapshot of the page after significant layout shifts
Use feature files as instructions to interact with the website
Perform all scenarios as individual cucumber tests
Navigate to the home page between scenarios
Treat any failure to find the expected content as a test failure
Intent matches are considered as test passes
Write out the test results as a cucumber json file as specified here https://docs.getxray.app/space/XRAYCLOUD/44577176/Import+Execution+Results+-+REST+v2#Cucumber-JSON-Results
Do not click save buttons unless instructed
Run a performance trace during each scenario and report any console errors