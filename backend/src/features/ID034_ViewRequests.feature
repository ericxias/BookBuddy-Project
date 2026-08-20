Feature: View Requests

    As a BookBuddy application user,
    I would like to view current requests
    So that I can manage them.

    Background:
        Given a user connects to the application

    Scenario Outline: User views their requests (Normal Flow)
        Given a request by user "<requester>" for the book "<bookTitle>" owned by user "<owner>" exists
        When the user with email "<requester>" tries to view their own requests
        Then the System shall return the request by user "<requester>" for the book "<bookTitle>" owned by user "<owner>"
        Examples:
        | requester       | bookTitle         | owner           |
        | joseph@mail.com | The Best of Scrum | john@gmail.com  |
        
    Scenario Outline: User views requests for their books by other users (Alternate Flow)
        Given a request by user "<requester>" for the book "<bookTitle>" owned by user "<owner>" exists
        When the user with email "<owner>" tries to view requests for their books by other users
        Then the System shall return the request by user "<requester>" for the book "<bookTitle>" owned by user "<owner>"
        Examples:
        | requester       | bookTitle         | owner           |
        | joseph@mail.com | The Best of Agile | john@mail.com   |
       