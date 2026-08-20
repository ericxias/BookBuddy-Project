Feature: Book listing creation

    As a BookBuddy application user,
    I would like to create a book listing
    So that I can sell or rent books I own.

    Background:
        Given a user connects to the application
        Given a user with email "test@mail.com" and password "Password11##" logged in

    Scenario Outline: User creates a listing to rent a book (Normal Flow)
        When a user with email "test@mail.com" creates a listing to rent with "<listingType>", "<bookTitle>", "<listingDescription>", "<price>", "<bookAuthor>", "<courseID>", "<school>", "<bookType>", "<rentalDuration>", and "<bookCondition>"
        Then the listing should be created 
            Examples:
                | listingType | bookTitle | listingDescription | price | bookAuthor | courseID | school | bookType | rentalDuration | bookCondition |
                | rent | "The Best of Scrum" | "This is a book about the best of scrum" | 70 | "John" | ecse428 | McGill | "Hard Cover" | 60 | "Like New" |
                | rent | "The Best of Agile" | "This is a book about the best of agile" | 35 | "Jessica" | ecse428 | McGill | "Hard Cover" | 90 |  "Very Used" |
                | rent | "The Best of Best" | "This is a book about the best of everything" | 95 | "Chris" | ecse578 | McGill | "Hard Cover" | 75 | "Used" |
                | rent | "The Best of Coding" | "This is a book about the best of coding" | 27 | "Laura" | ecse250 | McGill | "Soft Cover" | 35 |  "New" |

    Scenario Outline: User creates a listing to sell a book (Alternate Flow)
       When a user with email "test@mail.com" creates a listing to sell with "<listingType>", "<bookTitle>", "<listingDescription>", "<price>", "<bookAuthor>", "<courseID>", "<school>", "<bookType>", "<rentalDuration>", and "<bookCondition>"
        Then the listing should be created 
            Examples:
                | listingType | bookTitle | listingDescription | price | bookAuthor | courseID | school | bookType | rentalDuration | bookCondition |
                | sell | "The Best of Scrum" | "This is a book about the best of scrum" | 300 | "John" | ecse428 | McGill | "Hard Cover" | N/A | "Like New" |
                | sell | "The Best of Agile" | "This is a book about the best of agile" | 350 | "Jessica" | ecse428 | McGill | "Hard Cover" | N/A |  "Very Used" |
                | sell | "The Best of Best" | "This is a book about the best of everything" | 779 | "Chris" | ecse578 | McGill | "Hard Cover" | N/A | "Used" |
                | sell | "The Best of Coding" | "This is a book about the best of coding" | 475 | "Laura" | ecse250 | McGill | "Soft Cover" | N/A |  "New" |

    Scenario Outline: User attempts to create a listing but is missing a required field of listing type, book title, price, rental duration and book condition (Error Flow)
       When a user with email "test@mail.com" creates a listing to rent with "<listingType>", "<bookTitle>", "<listingDescription>", "<price>", "<bookAuthor>", "<courseID>", "<school>", "<bookType>", "<rentalDuration>", and "<bookCondition>"
        Then system should respond with an error
            Examples:
                | listingType | bookTitle | listingDescription | price | bookAuthor | courseID | school | bookType | rentalDuration | bookCondition |
                | blank | "The Best of Scrum" | "This is a book about the best of scrum" | 300 | "John" | ecse428 | McGill | "Hard Cover" | N/A | "Like New" |
                | sell | blank | "This is a book about the best of agile" | 350 | "Jessica" | ecse428 | McGill | "Hard Cover" | N/A |  "Very Used" |
                | rent | "The Best of Best" | "This is a book about the best of everything" | blank | "Chris" | ecse578 | McGill | "Hard Cover" | N/A | "Used" |
                | rent | "The Best of Coding" | "This is a book about the best of coding" | 475 | "Laura" | ecse250 | McGill | "Soft Cover" | blank |  "New" |
