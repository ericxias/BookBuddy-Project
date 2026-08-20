Feature: Log in user

    As a BookBuddy application user,
    I would like to log into my account
    So that I can view and post listings.

    Background:
        Given a user connects to the application
        And a user with emails and passwords exists in the system            
            | email                | password         |
            | willcreate@mail.com  | Password1#       |

    Scenario: User Logs in successfully first try (Normal Flow)
        When a user inputs "willcreate@mail.com" and "hardpassword123!" to log in
        Then a user is logged in

    Scenario: User Logs in successfully second try (Alternate Flow)
        When a user inputs "willcreate@mail.com" and "hardpassword!" to log in and the system responds with an error
        When a user reinputs "willcreate@mail.com" and "hardpassword123!" to log in
        Then a user is logged in
        
    Scenario: User Logs in unsuccessfully (Error Flow)
        When a user inputs "willcreate@mail.com" and "wrongpassword" to log in
        Then the system responds with error
        When a user inputs "nonexisting@mail.com" and "hardpassword123!" to log in
        Then the system responds with error
        When a user inputs "anotheruser@mail.com" and "password" to log in
        Then the system responds with error
        When a user inputs "example@mail.com" and "pass1234" to log in
        Then the system responds with error
