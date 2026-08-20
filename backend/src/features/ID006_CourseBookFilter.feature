Feature: Book Search Based on Course ID and Course Name

    As a BookBuddy application user, 
    I want to be able to search for a textbook based on the course ID and course name
    So that I can find the books that I need for my courses.

    Background:
        Given the following books and course exist in the system:
        | CourseID | CourseName                       | Title                        | Author     | BookType   | Condition | Price | user     |
        | MATH 141  | Calculus 2                        | Calculus 2                   | Stewart    | Math        | Good      | $30   | will3    |
        | BIOL 112  | Cell and Molecular Biology        | Biology 101                  | Johnson    | Science     | Fair      | $20   | willa    |
        | COMP 322  | Introduction to C++               | C++ Programming              | Stroustrup | Programming | New       | $60   | william  |
        | ENGL 437  | Studies in Literary Form          | The Great Gatsby             | Fitzgerald | Fiction     | Like new  | $15   | will2    |
        | CHEM 212  | Introductory Organic Chemistry 1  | Organic Chemistry            | Klein      | Science     | Fair      | $10   | will11   |

    Scenario: User filters books by course ID (Normal Flow)
        When the user enters the course ID "MATH 141" in the search bar
        Then the system should display a list of books with the course ID "MATH 141"

    Scenario: User filters books by course name (Alternate Flow)
        When the user enters the course name "Calculus 2" in the search bar
        Then the system should display a list of books with the course name "Calculus 2"

    Scenario: Error in filtering (Error Flow)
        When I specify the course ID of the book to be "MAT 141"
        Then I shall see the error "Invalid course ID"
