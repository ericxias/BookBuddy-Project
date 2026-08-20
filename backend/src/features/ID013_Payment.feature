Feature: Payment for Book
  As a BookBuddy application user,
  I want to be able to pay for the rental of the requested book(s) 
  so that I can complete my rental purchase.

  Background:
    Given the following books exist in the system:
      | Title                        | Author       | Book Type     | Condition  | Price | user     | Requested | Paid |
      | "Calculus 2"                 | "Stewart"    | "Math"        | "Good"     | $30   | james    | Yes       | No   |
      | "Biology 101"                | "Johnson"    | "Science"     | "Fair"     | $20   | james    | Yes       | No   |
      | "C++ Programming"            | "Stroustrup" | "Programming" | "New"      | $60   | james    | Yes       | Yes  |
    Given the user is on the payment page

  Scenario Outline: User successfully pays for a book (Normal Flow)
    When the user selects the textbook "Calculus 2" 
    And inputs their credit card information
    And selects the "Pay" button next to the textbook
    Then the System should confirm the payment request by the user for "Calculus 2"

  Scenario Outline: User successfully pays for multiple books (Alternate Flow)
    When the user selects the "Pay All" button at the bottom of the page
    And inputs their credit card information
    Then the System should confirm the payment request by the user for all textbooks 

  Scenario Outline: User attempts to pay for book that is not available (Error Flow)
    When the user selects the textbook "C++ Programming" 
    And inputs their credit card information
    And selects the "Pay" button next to the textbook
    Then the System should respond with the error message "C++ Programming has already been paid"