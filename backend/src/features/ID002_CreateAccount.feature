Feature: User Account Creation for BookBuddy Platform

    As a BookBuddy application user, 
    I want to be able to create an account 
    So that I can start using the platform.

    Background:
        Given a user connects to the application
        Given the following users exist in the system:
        | username | password   | role           |  email            |
        | admin    | admin123   | administrator  | admin@admin.com   |
        | admin1   | adminxhas  | administrator  | admin1@admin.com  |
        | will     | wil1word   | user           | will@gmail.com    |
        | tamtam   | user4@@    | user           | tamarin@yahoo.ca  |


    Scenario Outline: Successful account creation for a renter (Normal Flow)
        When a user fills in the registration form with "<email>", "<password>" and the accounts do not exist in system yet
        Then the user should receive a confirmation message "Account created successfully"
        And the user shall be added to the system
        Examples:
        | username | password   | role           |  email            |
        | admin105    | admin123105   | administrator  | admin@admin105.com   |
        | admin1105   | adminxhas105  | administrator  | admin1@admin105.com  |
        | will105    | wil1word105   | user           | will@gmail105.com    |
        | tamtam105  | user4@@105    | user           | tamarin@yahoo105.ca  |
        | atreyi105  | testtwo105    | user           | testtwo@gmail105.com |

        

    Scenario Outline: Email already exists (Error Flow)
        Given the email "tamarin@yahoo.ca" already exists in the database
        When a user fills in the registration form with "<email>", "<password>"
        Then the system will respond with error "Account creation failed"
        And the user shall not be added to the system
        Examples:
        | username | password   | role           |  email            |
        | admin    | admin123   | administrator  | admin@admin.com   |
        | admin1   | adminxhas  | administrator  | admin1@admin.com  |
        | will     | wil1word   | user           | will@gmail.com    |
        | tamtam   | user4@@    | user           | tamarin@yahoo.ca  |
        
