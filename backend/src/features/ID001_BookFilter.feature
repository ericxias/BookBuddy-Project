Feature: Book Filter Search

    As a BookBuddy application user, 
    I want to be able to filter a search based on various criteria such as title, book type, condition, price, author, and renter
    so that I can easily find the book(s) that I want.

    Background:
        Given a user connects to the application
        Given the following books exist in the system:
        | bookTitle                  | bookAuthor | bookType    | bookCondition  | price | user     | availability |
        | Calculus 2                 | Stewart    | Math        | Good           | $30   | will3    | Yes          |
        | Biology 101                | Johnson    | Science     | Fair           | $20   | willa    | Yes          |
        | C++ Programming            | Stroustrup | Programming | New            | $60   | william  | Yes          |
        | The Great Gatsby           | Fitzgerald | Fiction     | Like new       | $15   | will2    | Yes          |
        | Organic Chemistry          | Klein      | Science     | Fair           | $10   | will11   | Yes          |

    Scenario: User filters books by title (Normal Flow)
        When the user enters the title "Calculus 2" in the search bar
        Then the system should display a list of books with the title "Calculus 2"

    Scenario: User filters books by book type (Normal Flow)
        When the user selects the book type "Programming" from the filter options
        Then the system should display a list of books categorized as "Programming"

    Scenario: User filters books by author (Normal Flow)
        When the user searches for the author "Johnson"
        Then the system should display a refined list of only books by the author "Johnson":
        | Title                        | Author       | Book Type   | Condition  | Price | user     |
        | "Biology 101"                | "Johnson"    | "Science"   | "Fair"     | $20   | willa    |

    Scenario: No item matches filter (Alternate Flow)
        When I specify the author of the book as "J.K. Rowling"
        Then I shall see the error "Items of the specified author do not exist"

    Scenario: Error in filtering (Error Flow)
        When I specify the price of the book to be "-$30"
        Then I shall see the error "Invalid price value"
