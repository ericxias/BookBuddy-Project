Feature: Remove Request for Book
  As a BookBuddy application user
  I would like to remove a request to rent a specific book
  So that I will not need to rent a specific book

  Background:
    Given the following users exist in the system:
      | username | password   | role      | email             |
      | john     | password1  | user      | john@gmail.com    |
      | james    | password2  | user      | james@gmail.com   |
    Given the following requests exist in the system:
      | bookTitle                    | bookAuthor   | bookType      | bookCondition  | price | user     | requestID |
      | "Calculus 2"                 | "Stewart"    | "Math"        | "Good"         | $30   | james    | g4DlafLaD | 
      | "Biology 101"                | "Johnson"    | "Science"     | "Fair"         | $20   | james    | aF3SfdcWh |
      | "C++ Programming"            | "Stroustrup" | "Programming" | "New"          | $60   | james    | qaSdwRsAF |

    Given a user with email "john@gmail.com" and password "password1" is logged in
    Given the user is on the textbook request page

  Scenario Outline: User removes request for a book (Normal Flow)
    When the user selects a request with requestID "g4DlafLaD"
    And selects the "remove" button next to the textbook
    Then the system should confirm the removal of the request

  Scenario Outline: User removes request for a textbook that was not requested (Alternate Flow)
    When the user selects a request with requestID "dsFAIG2efd#"    And selects the "remove" button next to the textbook
    Then the system should respond with an error
    