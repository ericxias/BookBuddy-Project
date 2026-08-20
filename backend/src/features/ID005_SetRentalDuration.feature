Feature: Set Rental Duration

  As a BookBuddy application user, 
  I want to set the rental duration for requested textbooks
  So that I can rent books for a certain amount of time.

  Background:
   Given a user connects to the application
   Given the following users exist:
      | user                       | password         | role | status |
      | willcreate@mail.com        | hardpassword123! | user | normal |
      | william.lin@mail.mcgill.ca | hardpassword123  | user | normal |
   Given the following books exist in the system:
      | bookTitle         | bookAuthor   | bookType      | bookCondition | price | user                | availability |
      | Calculus 2      | Stewart    | Math       | Good       | 30   | willcreate@mail.com | Yes           |
      | Biology 101     | Johnson    | Science     | Fair        | 20   | willcreate@mail.com | Yes            |
      | C++ Programming | Stroustrup | Programming | New         | 60   | willcreate@mail.com | Yes          |
      | The Great Gatsby  | Fitzgerald | Fiction     | Like new | 15   | willcreate@mail.com |No        |
      | Organic Chemistry  | Klein     | Science     | Fair    | 10   | willcreate@mail.com |Yes       |
    Given a user with email "william.lin@mail.mcgill.ca" and password "hardpassword123" logged in
    Given the user is on the book requesting page
    
  Scenario: User sets rental duration for requested textbooks (Normal Flow)
    When the user "william.lin@mail.mcgill.ca" selects the textbook "Calculus 2"
    And sets the rental duration to "14" days
    And clicks the create request button
    Then the system should confirm the rental request for the book "Calculus 2" with a rental duration of "14" days

  Scenario: User sets rental duration for another requested textbook (Normal Flow)
    When the user "william.lin@mail.mcgill.ca" selects the textbook "Biology 101"
    And sets the rental duration to "30" days
    And clicks the create request button
    Then the system should confirm the rental request for the book "Biology 101" with a rental duration of "30" days

  Scenario: User sets rental duration for multiple requested textbooks (Alternate Flow)
    When the user "william.lin@mail.mcgill.ca" selects the textbook "Calculus 2"
    And the user "william.lin@mail.mcgill.ca" selects a second textbook, the textbook "Organic Chemistry"
    And sets the rental duration to "7" days
    And clicks the create request button
    Then the system should confirm the rental request for the book "Calculus 2" and "Organic Chemistry" with a rental duration of "7" days and "7" days respectively

  Scenario: User attempts to set an invalid rental duration (Error Flow)
    When the user "william.lin@mail.mcgill.ca" selects the textbook "C++ Programming"
    And sets the rental duration to "-3" days
    And clicks the create request button
    Then the system should display an error message "Invalid rental duration"

  Scenario: User sets rental duration for an unavailable textbook (Error Flow)
    When the user "william.lin@mail.mcgill.ca" selects the textbook "The Great Gatsby"
    And sets the rental duration to "21" days
    And clicks the create request button
    Then the system should display an error message "Error: Book listing is not available"
