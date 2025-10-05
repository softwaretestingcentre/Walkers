# Gherkin Reference (Main Section and All Sections Following Keywords)

Gherkin uses a set of special keywords to give structure and meaning to executable specifications. Each keyword is translated to many spoken languages; in this reference we'll use English.

Most lines in a Gherkin document start with one of the keywords.

Comments are only permitted at the start of a new line, anywhere in the feature file. They begin with zero or more spaces, followed by a hash sign (`#`) and some text. Block comments are currently not supported by Gherkin.

Either spaces or tabs may be used for indentation. The recommended indentation level is two spaces. Here is an example:

```
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

The trailing portion (after the keyword) of each step is matched to a code block, called a step definition.

Please note that some keywords are followed by a colon (`:`) and some are not. If you add a colon after a keyword that should not be followed by one, your test(s) will be ignored.

## Keywords

The primary keywords are:

- Feature
- Rule (as of Gherkin 6)
- Example (or Scenario)
- Given, When, Then, And, But for steps (or *)
- Background
- Scenario Outline (or Scenario Template)
- Examples (or Scenarios)

There are a few secondary keywords as well:

- `"""` (Doc Strings)
- `|` (Data Tables)
- `@` (Tags)
- `#` (Comments)

Gherkin is localised for many spoken languages; each has their own localised equivalent of these keywords.

---

## Step Arguments

In some cases you might want to pass more data to a step than fits on a single line. For this purpose Gherkin has Doc Strings and Data Tables.

### Doc Strings

Doc Strings are handy for passing a larger piece of text to a step definition. The text should be offset by delimiters consisting of three double-quote marks on lines of their own:

```
Given a blog post named "Random" with Markdown body
  """
  Some Title, Eh?
  ===============
  Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
  """
```

In your step definition, there’s no need to find this text and match it in your pattern. It will automatically be passed as the last argument in the step definition.

Indentation of the opening `"""` is unimportant, although common practice is two spaces in from the enclosing step. The indentation inside the triple quotes, however, is significant. Each line of the Doc String will be dedented according to the opening `"""`. Indentation beyond the column of the opening `"""` will therefore be preserved.

Doc strings also support using three backticks as the delimiter:

```
Given a blog post named "Random" with Markdown body
  ```
  Some Title, Eh?
  ===============
  Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
  ```
```

It's possible to annotate the DocString with the type of content it contains:

```
Given a blog post named "Random" with Markdown body
  """markdown
  Some Title, Eh?
  ===============
  Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
  """
```

### Data Tables

Data Tables are handy for passing a list of values to a step definition:

```
Given the following users exist:
  | name   | email              | twitter         |
  | Aslak  | aslak@cucumber.io  | @aslak_hellesoy |
  | Julien | julien@cucumber.io | @jbpros         |
  | Matt   | matt@cucumber.io   | @mattwynne      |
```

Just like Doc Strings, Data Tables will be passed to the step definition as the last argument.

If you want to use a newline character in a table cell, you can write this as `\n`. If you need a `|` as part of the cell, you can escape it as `\|`. And finally, if you need a `\`, you can escape that with `\\`.

Cucumber provides a rich API for manipulating tables from within step definitions. See the Data Table API reference for more details.

---

## Spoken Languages

The language you choose for Gherkin should be the same language your users and domain experts use when they talk about the domain. Translating between two languages should be avoided.

This is why Gherkin has been translated to over 70 languages.

Here is a Gherkin scenario written in Norwegian:

```
# language: no
Funksjonalitet: Gjett et ord

  Eksempel: Ordmaker starter et spill
    Når Ordmaker starter et spill
    Så må Ordmaker vente på at Gjetter blir med

  Eksempel: Gjetter blir med
    Gitt at Ordmaker har startet et spill med ordet "bløtt"
    Når Gjetter blir med på Ordmakers spill
    Så må Gjetter gjette et ord på 5 bokstaver
```

A `# language:` header on the first line of a feature file tells Cucumber what spoken language to use - for example `# language: fr` for French. If you omit this header, Cucumber will default to English (`en`).

Some Cucumber implementations also let you set the default language in the configuration, so you don't need to place the `# language` header in every file.

---

For more details, see the full Gherkin reference at [https://cucumber.io/docs/gherkin/reference](https://cucumber.io/docs/gherkin/reference)
