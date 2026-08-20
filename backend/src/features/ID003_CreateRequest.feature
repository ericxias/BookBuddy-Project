Feature: Create Request for Book
  As a BookBuddy application user
  I would like to create a request to rent a specific book
  So that I can rent available books from other students.

  Background: 
    Given a user connects to the application
    Given the following users exist:
      | user                       | password         | role | status |
      | willcreate@mail.com        | hardpassword123! | user | normal |
      | william.lin@mail.mcgill.ca | hardpassword123  | user | normal |
    Given the following books exist in the system:
      | bookTitle         | bookAuthor   | bookType      | bookCondition | price | user                | availability |
      | "Calculus 2"      | "Stewart"    | "Math"        | "Good"        | $30   | willcreate@mail.com | Yes           |
      | "Biology 101"     | "Johnson"    | "Science"     | "Fair"        | $20   | willcreate@mail.com | No            |
      | "C++ Programming" | "Stroustrup" | "Programming" | "New"         | $60   | willcreate@mail.com | Yes          |
    Given a user with email "willcreate@mail.com" and password "hardpassword123!" logged in
    Given the user is on the textbook request page

  Scenario: User successfully creates request for a book (Normal Flow)
    When the user selects the textbook "Calculus 2" owned by user "willcreate@mail.com"
    And creates the request
    Then the System should confirm the rental request by user "william.lin@mail.mcgill.ca" for "Calculus 2" owned by user "willcreate@mail.com"

  Scenario: User successfully creates request for multiple books owned by the same user (Alternate Flow)
    When the user selects the textbook "Calculus 2" owned by user "willcreate@mail.com"
    And the user selects a second textbook, the textbook "C++ Programming" owned by user "willcreate@mail.com"
    And creates the request
    Then the System should confirm the rental request by user "william.lin@mail.mcgill.ca" for "Calculus 2" and "C++ Programming" owned by user "willcreate@mail.com" is complete

  Scenario: User creates request for a book that is not available (Error Flow)
    When the user selects the textbook "Biology 101" owned by user "willcreate@mail.com"
    And creates the request
    Then the System should respond with the error message "Error: Book listing is not available"
