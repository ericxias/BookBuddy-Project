Feature: Notifications for Rental Events

As a BookBuddy application user
I want to receive notifications for important rental events
So that I am promptly informed about rental request approvals, new messages, and upcoming return dates, ensuring I don't miss any critical updates


Scenario: User receives a notification for a rental request approval (Normal Flow)

  Given User A has requested to rent a textbook from User B
  And User B has approved the rental request
  When the rental request approval is processed
  Then User A should receive a notification saying "Your rental request has been approved by [User B]."

Scenario: User receives a reminder for a return date (Alternate Flow)

  Given User A has rented a textbook with a return date approaching in 3 days
  When the system checks for upcoming return dates
  Then User A should receive a notification reminding them to return the textbook in 3 days

Scenario: User notifications are not being sent due to a system error (Error Flow)

  Given User A should receive any notification
  When there is a system error preventing notifications from being sent
  Then User A does not receive the expected notification
  And the system logs the error for review 

