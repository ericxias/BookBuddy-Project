Feature: Respond to Request for Book
  As a BookBuddy application user
  I would like to respond to requests for my books
  So that I can choose who to rent them to.

  Background:
    Given the following users has an account in the system:
      | username | password   | role           | status | email             |
      | mary     | password1  | user           | normal | mary@gmail.com    |
      | james    | password2  | user           | normal | james@gmail.com   |
    Given the following books are present in the system:
      | Title                        | Author       | Book Type     | Condition  | Price | user     | Available |
      | "Calculus 2"                 | "Stewart"    | "Math"        | "Good"     | $30   | james    | Yes       |
      | "Biology 101"                | "Johnson"    | "Science"     | "Fair"     | $20   | james    | No        |
      | "C++ Programming"            | "Stroustrup" | "Programming" | "New"      | $60   | james    | Yes       |
    Given a user with email "james@gmail.com" and password "password2" logged in
    Given a rental request by user "mary" for "Calculus 2" owned by user "james" exists

  Scenario: User successfully accepts request for book (Normal Flow)
    When the user accepts the request by user "mary" for "Calculus 2" owned by user "james"
    Then the book "Calculus 2" owned by user "james" shall have availability "No"

  Scenario: User successfully rejects request for book (Alternate Flow)
    When the user rejects the request by user "mary" for "Calculus 2" owned by user "james"
    Then the book "Calculus 2" owned by user "james" shall have availability "Yes"


    