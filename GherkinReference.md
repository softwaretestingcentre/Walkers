---

# Writing Better Gherkin

There are several ways to make your Gherkin better. Here are two key pieces of advice from the official Cucumber documentation:

## Describe behaviour

Your scenarios should describe the intended behaviour of the system, not the implementation. In other words, describe what, not how.

For example, for an authentication scenario, you should write:

```gherkin
When "Bob" logs in
```

instead of:

```gherkin
Given I visit "/login"
When I enter "Bob" in the "user name" field
And I enter "tester" in the "password" field
And I press the "login" button
Then I should see the "welcome" page
```

The first example is a functional requirement. The second, much longer, example is a procedural reference. Functional requirements are features, but procedures belong in the implementation details.

That way, when the implementation of a feature changes, you'll only need to change the process steps behind the scenes. The behaviour does not have to change just because the implementation does. A good question to ask yourself when writing a feature clause is: “Will this wording need to change if the implementation does?” If the answer is “Yes”, then you should rework it to avoid implementation-specific details. As a side benefit, your scenarios will be a lot shorter and much easier to follow and understand.

## Consider a more declarative style

One way to make scenarios easier to maintain and less brittle is to use a declarative style. Declarative style describes the behaviour of the application, rather than the implementation details. Declarative scenarios read better as "living documentation" and help you focus on the value that the customer is getting, rather than the keystrokes they will use.

Imperative tests communicate details, and in some contexts this style of test is appropriate. However, because they are so closely tied to the mechanics of the current UI, they often require more work to maintain. Any time the implementation changes, the tests need to be updated too.

Here's an example of a feature in an imperative style:

```gherkin
Feature: Subscribers see different articles based on their subscription level
  Scenario: Free subscribers see only the free articles
    Given users with a free subscription can access "FreeArticle1" but not "PaidArticle1"
    When I type "freeFrieda@example.com" in the email field
    And I type "validPassword123" in the password field
    And I press the "Submit" button
    Then I see "FreeArticle1" on the home page
    And I do not see "PaidArticle1" on the home page

  Scenario: Subscriber with a paid subscription can access "FreeArticle1" and "PaidArticle1"
    Given I am on the login page
    When I type "paidPattya@example.com" in the email field
    And I type "validPassword123" in the password field
    And I press the "Submit" button
    Then I see "FreeArticle1" and "PaidArticle1" on the home page
```

A more declarative style hides the details of how the application's capabilities are implemented:

```gherkin
Feature: Subscribers see different articles based on their subscription level
  Scenario: Free subscribers see only the free articles
    Given Free Frieda has a free subscription
    When Free Frieda logs in with her valid credentials
    Then she sees a Free article

  Scenario: Subscriber with a paid subscription can access both free and paid articles
    Given Paid Patty has a basic-level paid subscription
    When Paid Patty logs in with her valid credentials
    Then she sees a Free article and a Paid article
```

With a declarative style, each step communicates an idea, but the exact values aren't specified. The details of how the user interacts with the system, such as which specific articles are free or paid, and the subscription level of different test users, are specified in the step definitions (the automation code that interacts with the system). The subscription packages could change in the future. The business could change what content is available to subscribers on free and paid plans, without having to change this scenario and other scenarios that use the same step definitions. By avoiding terms like “click a button” that suggest implementation, the scenario is more resilient to implementation details of the UI. The intent of the scenario remains the same, even if the implementation changes later. In addition, having too many implementation details in a scenario makes it harder to understand the intended behaviour it illustrates.

# Gherkin Reference (Main Section and All Sections Following Keywords)

Gherkin uses a set of special keywords to give structure and meaning to executable specifications. Each keyword is translated to many spoken languages; in this reference we'll use English.



# Gherkin Reference

Gherkin is a language for writing structured, executable specifications for software. It uses a set of special keywords to give structure and meaning to specifications. Each keyword is translated to many spoken languages; in this reference, English is used.

## Table of Contents
- Keywords
- Feature
- Descriptions
- Rule
- Example (Scenario)
- Steps (Given, When, Then, And, But, *)
- Background
- Scenario Outline
- Examples
- Step Arguments (Doc Strings, Data Tables)
- Spoken Languages

---


## Keywords

The primary keywords are:

- Feature
- Rule (as of Gherkin 6)
- Example (or Scenario)
- Given, When, Then, And, But for steps (or *)
- Background
- Scenario Outline (or Scenario Template)
- Examples (or Scenarios)

Secondary keywords:

- `"""` (Doc Strings)
- `|` (Data Tables)
- `@` (Tags)
- `#` (Comments)

Most lines in a Gherkin document start with one of the keywords. Comments are only permitted at the start of a new line, anywhere in the feature file. They begin with zero or more spaces, followed by a hash sign (`#`) and some text. Block comments are not supported.

Either spaces or tabs may be used for indentation. The recommended indentation level is two spaces. Here is an example:

```gherkin
Feature: Guess the word
  # The first example has two steps
  Scenario: Maker starts a game
    When the Maker starts a game
    Then the Maker waits for a Breaker to join

  # The second example has three steps
  Scenario: Breaker joins a game
    Given the Maker has started a game with the word "silky"
    When the Breaker joins the Maker's game
    Then the Breaker must guess a word with 5 characters
```

---


---

## Feature

The `Feature` keyword provides a high-level description of a software feature and groups related scenarios. The first primary keyword in a Gherkin document must always be `Feature`, followed by a colon (`:`) and a short text that describes the feature.

You can add free-form text underneath `Feature` to add more description. These description lines are ignored by Cucumber at runtime, but are available for reporting (they are included by reporting tools like the official HTML formatter).

The purpose is to provide a place for you to document important aspects of the feature, such as a brief explanation and a list of business rules (general acceptance criteria).

The free format description for `Feature` ends when you start a line with the keyword `Background`, `Rule`, `Example`, or `Scenario Outline` (or their alias keywords).

You can place tags above `Feature` to group related features, independent of your file and directory structure.

You can only have a single `Feature` in a `.feature` file.

Example:
```gherkin
Feature: Guess the word
  The word guess game is a turn-based game for two players.
  The Maker makes a word for the Breaker to guess. The game is over when the Breaker guesses the Maker's word.
```

---


---

## Descriptions

Free-form descriptions (as described above for `Feature`) can also be placed underneath `Example`/`Scenario`, `Background`, `Scenario Outline`, and `Rule`.

You can write anything you like, as long as no line starts with a keyword. Descriptions can be in the form of Markdown and are supported by formatters such as the official HTML formatter.

---


---

## Rule

The (optional) `Rule` keyword has been part of Gherkin since v6. The purpose of the `Rule` keyword is to represent one business rule that should be implemented. It provides additional information for a feature. A `Rule` is used to group together several scenarios that belong to this business rule. A `Rule` should contain one or more scenarios that illustrate the particular rule.

Example:
```gherkin
Feature: Highlander
  Rule: There can be only One
    Example: Only One -- More than one alive
      Given there are 3 ninjas
      And there are more than one ninja alive
      When 2 ninjas meet, they will fight
      Then one ninja dies (but not me)
      And there is one ninja less alive
    Example: Only One -- One alive
      Given there is only 1 ninja alive
      Then they will live forever ;-)
```

---


---

## Example (Scenario)

The `Example` (or `Scenario`) keyword introduces a concrete example that illustrates a business rule. It consists of a list of steps. The keyword `Scenario` is a synonym of the keyword `Example`.

You can have as many steps as you like, but it is recommended to have 3-5 steps per example. Too many steps can reduce the expressive power of the example as a specification and documentation.

In addition to being a specification and documentation, an example is also a test. As a whole, your examples are an executable specification of the system.

Examples follow this pattern:
- Describe an initial context (`Given` steps)
- Describe an event (`When` steps)
- Describe an expected outcome (`Then` steps)

Example:
```gherkin
Scenario: Maker starts a game
  When the Maker starts a game
  Then the Maker waits for a Breaker to join

Scenario: Breaker joins a game
  Given the Maker has started a game with the word "silky"
  When the Breaker joins the Maker's game
  Then the Breaker must guess a word with 5 characters
```

---


---

## Steps (Given, When, Then, And, But, *)

Each step starts with `Given`, `When`, `Then`, `And`, or `But`. Cucumber executes each step in a scenario one at a time, in the sequence you’ve written them in. When Cucumber tries to execute a step, it looks for a matching step definition to execute.

Keywords are not taken into account when looking for a step definition. This means you cannot have a `Given`, `When`, `Then`, `And` or `But` step with the same text as another step.

#### Given
Describes the initial context of the system. Used to put the system in a known state before the user (or external system) starts interacting with the system (in the `When` steps). Avoid talking about user interaction in `Given`'s. If you were creating use cases, `Given`'s would be your preconditions.

Example:
```gherkin
Given the Maker has started a game with the word "silky"
```

#### When
Describes an event, or an action. This can be a person interacting with the system, or it can be an event triggered by another system. Try to avoid making assumptions about technology or user interface.

Example:
```gherkin
When the Breaker joins the Maker's game
```

#### Then
Describes an expected outcome, or result. The step definition of a `Then` step should use an assertion to compare the actual outcome to the expected outcome. Outcomes should be observable outputs, not internal state changes.

Example:
```gherkin
Then the Breaker must guess a word with 5 characters
```

#### And, But
If you have successive `Given`'s or `Then`'s, you could write them as `And` or `But` for readability.

Example:
```gherkin
Given one thing
And another thing
And yet another thing
When I open my eyes
Then I should see something
But I shouldn't see something else
```

#### * (Asterisk)
Gherkin also supports using an asterisk (`*`) in place of any of the normal step keywords. This can be helpful when you have some steps that are effectively a list of things.

Example:
```gherkin
Scenario: All done
  Given I am out shopping
  * I have eggs
  * I have milk
  * I have butter
  When I check my list
  Then I don't need anything
```

---


---

## Background

Occasionally you'll find yourself repeating the same `Given` steps in all of the scenarios in a `Feature`. You can move such `Given` steps to the background, by grouping them under a `Background` section. A `Background` allows you to add some context to the scenarios that follow it. It can contain one or more `Given` steps, which are run before each scenario, but after any Before hooks.

You can only have one set of `Background` steps per `Feature` or `Rule`. If you need different `Background` steps for different scenarios, consider breaking up your set of scenarios into more `Rule`s or more `Feature`s.

Example:
```gherkin
Feature: Multiple site support
  Only blog owners can post to a blog, except administrators, who can post to all blogs.
  Background:
    Given a global administrator named "Greg"
    And a blog named "Greg's anti-tax rants"
    And a customer named "Dr. Bill"
    And a blog named "Expensive Therapy" owned by "Dr. Bill"
  Scenario: Dr. Bill posts to his own blog
    Given I am logged in as Dr. Bill
    When I try to post to "Expensive Therapy"
    Then I should see "Your article was published."
  Scenario: Dr. Bill tries to post to somebody else's blog, and fails
    Given I am logged in as Dr. Bill
    When I try to post to "Greg's anti-tax rants"
    Then I should see "Hey! That's not your blog!"
  Scenario: Greg posts to a client's blog
    Given I am logged in as Greg
    When I try to post to "Expensive Therapy"
    Then I should see "Your article was published."
```

---


---

## Scenario Outline

The `Scenario Outline` keyword can be used to run the same `Scenario` multiple times, with different combinations of values. The keyword `Scenario Template` is a synonym of the keyword `Scenario Outline`.

Scenario outlines allow us to more concisely express these scenarios through the use of a template with `< >`-delimited parameters. The steps can use `< >` delimited parameters that reference headers in the examples table. Cucumber will replace these parameters with values from the table before it tries to match the step against a step definition.

Example:
```gherkin
Scenario Outline: eating
  Given there are <start> cucumbers
  When I eat <eat> cucumbers
  Then I should have <left> cucumbers
  Examples:
    | start | eat | left |
    |   12  |  5  |   7  |
    |   20  |  5  |  15  |
```

---


---

## Examples

A `Scenario Outline` must contain one or more `Examples` (or `Scenarios`) section(s). Its steps are interpreted as a template which is never directly run. Instead, the `Scenario Outline` is run once for each row in the `Examples` section beneath it (not counting the first header row).

You can use parameters in `Scenario Outline` descriptions as well as in multiline step arguments.

---


---

## Step Arguments

In some cases you might want to pass more data to a step than fits on a single line. For this purpose Gherkin has Doc Strings and Data Tables.

### Doc Strings
Handy for passing a larger piece of text to a step definition. The text should be offset by delimiters consisting of three double-quote marks on lines of their own. Indentation of the opening `"""` is unimportant, but the indentation inside the triple quotes is significant. Each line of the Doc String will be dedented according to the opening `"""`.

Example:
```gherkin
Given a blog post named "Random" with Markdown body
  """
  Some Title, Eh?
  ===============
  Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
  """
```

Doc strings also support using three backticks as the delimiter:
```gherkin
Given a blog post named "Random" with Markdown body
  ```
  Some Title, Eh?
  ===============
  Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
  ```
```

It's possible to annotate the DocString with the type of content it contains:
```gherkin
Given a blog post named "Random" with Markdown body
  """markdown
  Some Title, Eh?
  ===============
  Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
  """
```

### Data Tables
Handy for passing a list of values to a step definition. Just like Doc Strings, Data Tables will be passed to the step definition as the last argument. If you want to use a newline character in a table cell, you can write this as `\n`. If you need a `|` as part of the cell, you can escape it as `\|`. And finally, if you need a `\`, you can escape that with `\\`.

Example:
```gherkin
Given the following users exist:
  | name   | email              | twitter         |
  | Aslak  | aslak@cucumber.io  | @aslak_hellesoy |
  | Julien | julien@cucumber.io | @jbpros         |
  | Matt   | matt@cucumber.io   | @mattwynne      |
```

---



For more details, see the full Gherkin reference at [https://cucumber.io/docs/gherkin/reference](https://cucumber.io/docs/gherkin/reference)
