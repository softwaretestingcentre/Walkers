# Application analysis
Create a markdown file in the parent directory which describes what the application UI elements do based on the codebase in /src

# Test design from the code
suggest some functional tests in BDD format after reading the codebase in the current directory

# Test design from requirements
read the csv file of jira tickets and determine which tickets need
- UI testing
- API testing
- Security testing
- Performance testing
- Live monitoring
- No testing
for each testable ticket, create test scenarios in BDD format grouped into feature files

# Test design principles
BDD scenarios should be no more than 5 steps unless the test is complex - in which case consider splitting it into smaller tests

BDD scenarios should be expressed in terms of high-level user goals, tasks and questions. Avoid writing tests in terms of step-by-step UI interactions.

Use a mix of inputs to test valildation and compatibility.

Use values at the extreme ends of input ranges to test edge cases.

If the business objects handled by the application have lifecycles, check each stage of the lifecycle.

Keep track of previous test results to measure consistency.

Try breaking or reversing happy paths through the application.

When triggering errors, ensure that application messaging is accurate and actionable.

After creating a feature file, create a matching step definitions file using gherkin and javascript syntax, providing an empty function with no parameters for each step.

Make use of gherkin features such as step arguments and data tables as specified here https://cucumber.io/docs/gherkin/reference#step-arguments

If you produce similar scenarios that perform the same actions with different data, use a Scenario Outline as specified here https://cucumber.io/docs/gherkin/reference#scenario-outline

Then refactor the feature file and step definitions to reduce the number of unique step definitions needed.

Place any tags above the first line of the scenario.

Place any comments after the last line of the scenario.