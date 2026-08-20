Feature: Report User

    As a BookBuddy application user, 
    I want to be able to report another user if they violate the community guidelines, 
    So that they can be reviewed by administrators and appropriate action can be taken.

    Background:
         Given the following users exist in this system:
            | uid         | password        | role           | status | email                   |
            | xSjshfiweds | admin123        | administrator  | normal | admin@admin.com         |
            | sDEfiSFdskw | adminxhas       | administrator  | normal | admin1@admin.com        |
            | sEjfdOsdWqD | hardpassword123!| user           | normal | willcreate@mail.com     |
            | asFdsFDkaEn | xyz1            | user           | normal | xyz@yahoo.ca            |
            

        Given a user with email "willcreate@mail.com" and password "hardpassword123!" logged in
        And I am on the user's profile page

    Scenario: Report an user for violating community guidelines (Normal Flow)
        When I attempt to report the seller with uid "asFdsFDkaEn"
        And I select the reason for reporting as "harassment" and a description "The user keeps harassing me to buy their product."
        Then I should see a message confirming submission of my report

    Scenario: Report an user with no reason selected (Error Flow)
        When I attempt to report the seller with uid "asFdsFDkaEn"
        And I submit the report without selecting a reason
        Then I should see the error message "Please select a reason for the report"

    Scenario: Report an user with no explanation entered (Alternate Flow)
         When I attempt to report the seller with uid "asFdsFDkaEn"
        And I submit the report selecting the reason "false advertisement" without a description
        Then I should see a message confirming submission of my report
       
