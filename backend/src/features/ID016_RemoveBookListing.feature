Feature: Remove a Book Listing

    As a BookBuddy application user,
    I would like to remove a book listing
    So that I can stop renting a book I own and keep it to myself.

    Background:
        Given a user connects to the application
        Given a user with email "test@mail.com" and password "Password11##" logged in
        
    Scenario: User removes a book listing to rent a book (Normal Flow)
        Given a listing with listingType "rent", bookTitle "The Best of Scrum", listingDescription "This is a book about the best of scrum", price "70", bookAuthor "John", courseID "ecse428", school "McGill", bookType "Hard Cover", rentalDuration "60", bookCondition "Like New", user "test@mail.com" exists
        When a user with email "test@mail.com" attempts to remove the listing with listingType "rent", bookTitle "The Best of Scrum", listingDescription "This is a book about the best of scrum", price "70", bookAuthor "John", courseID "ecse428", school "McGill", bookType "Hard Cover", rentalDuration "60", bookCondition "Like New", user "test@mail.com"
        Then the system shall confirm the removal of the book listing from the system

    Scenario: User removes a listing to sell a book (Alternate Flow)
        Given a listing with listingType "sell", bookTitle "The Best of Agile", listingDescription "This is a book about the best of agile", price "35", bookAuthor "Jessica", courseID "ecse428", school "McGill", bookType "Hard Cover", rentalDuration "N/A", bookCondition "Very Used", user "test@mail.com" exists
        When a user with email "test@mail.com" attempts to remove the listing with listingType "sell", bookTitle "The Best of Agile", listingDescription "This is a book about the best of agile", price "35", bookAuthor "Jessica", courseID "ecse428", school "McGill", bookType "Hard Cover", rentalDuration "N/A", bookCondition "Very Used", user "test@mail.com"
        Then the system shall confirm the removal of the book listing from the system
    
    Scenario: User attempts to remove a book listing that does not exist (Error Flow)
        When a user with email "test@mail.com" attempts to remove a listing that does not exist
        Then the system shall respond with an error

    Scenario: User attempts to remove a book listing that does not belong to them (Error Flow)
        Given a listing with listingType "rent", bookTitle "The Best of Coding", listingDescription "This is a book about the best of coding", price "27", bookAuthor "Laura", courseID "ecse250", school "McGill", bookType "Soft Cover", rentalDuration "35", bookCondition "New", user "john@gmail.com" exists
        When a user with email "test@mail.com" attempts to remove the listing with listingType "rent", bookTitle "The Best of Coding", listingDescription "This is a book about the best of coding", price "27", bookAuthor "Laura", courseID "ecse250", school "McGill", bookType "Soft Cover", rentalDuration "35", bookCondition "New", user "john@gmail.com"
        Then the system shall respond with an error