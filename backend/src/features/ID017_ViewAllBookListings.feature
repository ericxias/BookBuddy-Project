Feature: Get All Book Listings

  Scenario: Successfully get all book listings
    Given the application is running
    When a GET request is made to '/getAllBookListings'
    Then the response status code should be 200
    And the response should contain a list of book listings

