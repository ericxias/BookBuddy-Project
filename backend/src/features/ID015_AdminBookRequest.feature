Feature: Admin Post for Specific Book Search

    As an admin of the BookBuddy application,
    I want to be able to post a request looking for specific books,
    so that users can offer or recommend books that match the search criteria.

    Background:
        Given I am logged in as an admin user

    Scenario: Admin posts a request looking for a specific book (Normal Flow)
        Given I am on the "Post Request" page
        When I enter the following details into the request form
            | Title        | Author     | Book Type     | Condition  | Price Range |
            | Calculus 101 | Smith      | Textbook      | Any        | $10 - $50   |
        And I click on the "Post Request" button
        Then the system should confirm that the request has been posted
        And the request should be visible to all users in the "Book Requests" section

    Scenario: Admin posts a request with incomplete details (Error Flow)
        Given I am on the "Post Request" page
        When I enter the following details into the request form
            | Title        | Author     | Book Type     | Condition  | Price Range |
            | Calculus 101 |            | Textbook      | Any        | $10 - $50   |
        And I click on the "Post Request" button
        Then the system should display an error message "Please complete all required fields"
        And the request should not be posted

    Scenario: Users respond to a book request (Normal Flow)
        Given a request for "Calculus 101" by Smith has been posted by an admin
        When a user logs in and navigates to the "Book Requests" section
        And clicks on the "Respond" button next to the "Calculus 101" request
        And submits a form indicating they have the book available for sale or exchange
        Then the admin should receive a notification about the response
        And can view the details of the user's offer

    Scenario: Admin updates a request post (Normal Flow)
        Given I have previously posted a request for "Calculus 101" by Smith
        When I navigate to the "My Posts" section
        And click on the "Edit" button next to the "Calculus 101" request
        And update the Price Range to "$20 - $60"
        And click on the "Update Request" button
        Then the system should confirm that the request has been updated
        And the updated details should be visible in the "Book Requests" section

    Scenario: Admin deletes a request post (Normal Flow)
        Given I have previously posted a request for "Calculus 101" by Smith
        When I navigate to the "My Posts" section
        And click on the "Delete" button next to the "Calculus 101" request
        Then the system should confirm that the request has been deleted
        And the request should no longer be visible in the "Book Requests" section
