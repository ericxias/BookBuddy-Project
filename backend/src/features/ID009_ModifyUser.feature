Feature: Modify Account Information

    As a BookBuddy application user, 
    I want to be able to modify my account information 
    So that I can keep my profile up-to-date with accurate information.
Background:
     Given a user connects to the application
     Given the following accounts exist:
      | email                      | password         | role | status |
      | willcreate@mail.com        | hardpassword123! | user | normal |
      | william.lin@mail.mcgill.ca | hardpassword123  | user | normal |
    Given an account with email "willcreate@mail.com" and password "hardpassword123!" logged in

    Scenario: Update password (Normal Flow)
        When I update my password to "newpassword"
        Then my account password should be "newpassword"


    Scenario: Update email address (Normal Flow)
        When I update my email to "mynewmail@example.com"
        Then my account email should be "mynewmail@example.com"

    Scenario: User enters invalid email address (Error Flow)
        When I attempt to update my email to "notanemailaddress"
        Then I shall see the error message  "the email address is invalid"