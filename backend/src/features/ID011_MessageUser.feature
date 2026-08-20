Feature: User-to-User Messaging

As a BookBuddy application user
I want to message other users directly within the app
So that I can communicate about textbook rentals, negotiate terms, and clarify details without leaving the platform

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

Scenario: User successfully manage to send a "text message" to another user (Normal Flow)
  When user types in a "text message" regarding the textbook rental
  And user clicks on the "Send Message" button
  Then the textbook owner should receive the sent "text message"

Scenario: User attempts to send a message without typing anything (Alternate Flow)
  When user clicks on the "Send Message" button
  Then the system should display an error message "Cannot send an empty message."

Scenario: Messaging service is unavailable (Failure Flow)
  When user types in a "text message" regarding the textbook rental
  And user clicks on the "Send Message" button
  Then the system should display an error message "Messaging service is temporarily unavailable, please try again later."


