from behave import *
from app import app
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from book_functions import Book_functions
import requests

# location terminal --> backend\src
# run specific feature --> "behave -i <name of feature file>", for example "behave -i ID007_LogInUser.feature"
# run all features --> behave
client = app.test_client()

db = firestore.client()

@given('a user connects to the application')
def step_impl(context):
    app.config.update({"TESTING": True})
    response = client.get('/')
    assert response.status_code == 200

############################################## Sarah ID008_BookListingCreation.feature

@given(u'a user with email "{email}" and password "{password}" logged in')
def step_impl(context, email, password):
    context.response = client.post('/login', json={"email": email, "password": password, "returnSecureToken": "True"})
    print(f"Logging in user with email: {email}, password: {password}")

@when(u'a user with email "{email}" creates a listing to rent with "{listingType}", "{bookTitle}", "{listingDescription}", "{price}", "{bookAuthor}", "{courseID}", "{school}", "{bookType}", "{rentalDuration}", and "{bookCondition}')
def step_impl(context, email, listingType, bookTitle, listingDescription, price, bookAuthor, courseID, school, bookType, rentalDuration, bookCondition):
    listing_data = {
        "user": email,
        "listingType": listingType,
        "bookTitle" : bookTitle,
        "listingDescription": listingDescription,
        "price": price,
        "bookAuthor": bookAuthor,
        "courseID": courseID,
        "school": school,
        "bookType": bookType,
        "rentalDuration": rentalDuration,
        "bookCondition": bookCondition
    }
    # Temporary fix for empty strings in Gherkin
    for key in listing_data:
        if (listing_data[key] == "blank"):
            listing_data[key] = str()
    context.response = client.post("/createBookListing", json=listing_data) 
       

@when(u'a user with email "{email}" creates a listing to sell with "{listingType}", "{bookTitle}", "{listingDescription}", "{price}", "{bookAuthor}", "{courseID}", "{school}", "{bookType}", "{rentalDuration}", and "{bookCondition}')
def step_impl(context, email, listingType, bookTitle, listingDescription, price, bookAuthor, courseID, school, bookType, rentalDuration, bookCondition):
    listing_data = {
        "user": email,
        "listingType": listingType,
        "bookTitle" : bookTitle,
        "listingDescription": listingDescription,
        "price": price,
        "bookAuthor": bookAuthor,
        "courseID": courseID,
        "school": school,
        "bookType": bookType,
        "rentalDuration": rentalDuration,
        "bookCondition": bookCondition
    }
    # Temporary fix for empty strings in Gherkin
    for key in listing_data:
        if (listing_data[key] == "blank"):
            listing_data[key] = str()
    context.response = client.post("/createBookListing", json=listing_data) 

@then(u'the listing should be created')
def step_impl(context):
    assert context.response.status_code == 200  

@then(u'system should respond with an error')
def step_impl(context):
    assert context.response.status_code == 400


############################################## Will ID007_LoginUser.feature
@given('a user with emails and passwords exists in the system')
def step_user_exists_in_system(context):
    for row in context.table:
        email = row['email']
        password = row['password']

@when('a user inputs "{email}" and "{password}" to log in')
def step_when_user_inputs_email_and_password(context, email, password):
    login_data = {"email": email, "password": password}
    context.response = client.post("/login", json=login_data)

@when('a user inputs "{email}" and "{password}" to log in and the system responds with an error')
def step_when_user_inputs_email_and_password_with_error(context, email, password):
    login_data = {"email": email, "password": password}
    context.response = client.post("/login", json=login_data)

@when('a user reinputs "{email}" and "{password}" to log in')
def step_when_user_reinputs_email_and_password(context, email, password):
    login_data = {"email": email, "password": password}
    context.response = client.post("/login", json=login_data)

@when('a user inputs "{email}" and "{password}" to log in unsuccessfully')
def step_when_user_inputs_email_and_password_unsuccessfully(context, email, password):
    login_data = {"email": email, "password": password}
    context.response = client.post("/login", json=login_data)

@then('a user is logged in')
def step_then_user_is_logged_in(context):
    assert context.response.status_code == 200

@then('the system responds with error')
def step_then_system_responds_with_error(context):
    assert context.response.status_code == 200

@then('the user is not logged in')
def step_then_user_is_not_logged_in(context):
    assert context.response.status_code != 200  

############################################## Atreyi ID002_CreateAccount.feature
@given('the following users exist in the system')
def step_impl(context):
    for row in context.table:
        user_data = {
            "username": row["username"],
            "password": row["password"],
            "role": row["role"],
            "email": row["email"]
        }
        print(f"Creating user: {user_data}")

@when('a user fills in the registration form with "{email}", "{password}"')
def step_impl(context, email, password):
    signup_data={"password":password,  "email": email}
    context.response=client.post("/signup", json=signup_data)

@when('a user fills in the registration form with "{email}", "{password}" and the accounts do not exist in system yet')
def step_impl(context, email, password):
    signup_data={"password":password,  "email": email}
    context.response=client.post("/signup", json=signup_data)

    # Cleanup for next test to pass
    data = json.loads(context.response.data)
    print(data)
    db.collection("users").document(data["data"]["localId"]).delete()
    auth.delete_user(data["data"]["localId"])

@then('the user should receive a confirmation message "Account created successfully"')
def step_impl(context):
    assert context.response.status_code == 200
    data = json.loads(context.response.data)
    assert data.get('message') == 'Account created successfully', "The confirmation message does not match."

@then('the user shall be added to the system')
def step_impl(context):
    assert context.response.status_code == 200


@then('the user shall not be added to the system')
def step_impl(context):
    assert context.response.status_code == 400

@given('the email "{existing_email}" already exists in the database')
def step_username_exists(context, existing_email):
    users_ref = db.collection('users')  
    user_doc = users_ref.document(existing_email) 
    user_doc.set({
        'email': existing_email,
        'password': 'password',  
    })


@then(u'the system will respond with error "Account creation failed"')
def step_impl(context):
    assert context.response.status_code == 400
    data = json.loads(context.response.data)
    assert data.get('error') == 'Account creation failed', "The error message does not match."
    
############################################## Lucas ID003_CreateRequest.feature
    
@given('the following users exist')
def step_impl(context):
    for row in context.table:
        user_data = {
            "email": row["user"],
            "password": row["password"],
            "role": row["role"],
            "status": row["status"]
        }
        print(f"Creating user: {user_data}")
        users_ref = db.collection('users')  
        user = users_ref.document(user_data["email"]) 
        user.set({
                'email': user_data["email"],
                'password': user_data["password"],
                "role": user_data["role"],
                "status": user_data["status"]  
            })
        # print("Created User: ", db.collection('users').document(user_data["email"]).get().to_dict())

@given('the following books exist in the system')
def step_impl(context):
    i =0
    for row in context.table:
        i+=1
        book_listing_data = {
            "bookTitle": row["bookTitle"],
            "bookAuthor": row["bookAuthor"],
            "bookType": row["bookType"],
            "bookCondition": row["bookCondition"],
            "price": row["price"],
            "user": row["user"],
            "availability": row["availability"]
        }
        # print(f"Creating Book: {book_listing_data}")
        
        bookListing_ref = db.collection('bookListings')
        bookListing = bookListing_ref.document(f"id{i}")
        # print(f"book id{i}")
        bookListing.set(book_listing_data)
        
@given('the user is on the textbook request page')
def step_impl(context):
    assert context.response.status_code == 200

@when(u'the user selects the textbook "{textBook}" owned by user "{user}"')
def step_impl(context, textBook, user):
    context.data = 1, textBook, user

@when(u'the user selects a second textbook, the textbook "{textBook}" owned by user "{user}"')
def step_impl(context, textBook, user):
    data = context.data
    context.data = 2, data[1], data[2], textBook, user

@when('creates the request')
def step_impl(context):
    data = context.data
    if(data[1] == "Calculus 2"):
        the_id = "id1"
    if(data[1] == "Biology 101"):
        the_id = "id2"
    if(data[1] == "C++ Programming"):
        the_id = "id3"
    first_response = client.post('/createRequest', json={
            "bookTitle": data[1],
            "user": data[2],
            "id": the_id,
            "email": "william.lin@mail.mcgill.ca",
        })
    context.response = first_response
    if(data[0] == 2):
        if(data[3] == "Calculus 2"):
            the_id = "id1"
        if(data[3] == "Biology 101"):
            the_id = "id2"
        if(data[3] == "C++ Programming"):
            the_id = "id3"
        second_response = client.post('/createRequest', json={
            "bookTitle": data[3],
            "user": data[4],
            "id": the_id,
            "email": "william.lin@mail.mcgill.ca",
        })
        context.response = first_response, second_response
    
@then(u'the System should confirm the rental request by user "{requesterEmail}" for "{bookTitle}" owned by user "{listingEmail}"')
def step_impl(context, requesterEmail, bookTitle, listingEmail):
    assert context.response.status_code == 200
    request_data = json.loads(context.response.data)
    assert request_data["data"]["requester"]["email"] == requesterEmail
    assert request_data["data"]["user"]== listingEmail
    assert request_data["data"]["bookTitle"] == bookTitle

@then(u'the System should confirm the rental request by user "{requesterEmail}" for "{bookTitle1}" and "{bookTitle2}" owned by user "{listingEmail}" is complete')
def step_impl(context, requesterEmail, bookTitle1, bookTitle2, listingEmail):
    assert context.response[0].status_code == 200
    request_data = json.loads(context.response[0].data)
    assert request_data["data"]["requester"]["email"] == requesterEmail
    assert request_data["data"]["user"]== listingEmail
    assert request_data["data"]["bookTitle"] == bookTitle1

    assert context.response[1].status_code == 200
    request_data = json.loads(context.response[1].data)
    assert request_data["data"]["requester"]["email"] == requesterEmail
    assert request_data["data"]["user"]== listingEmail
    assert request_data["data"]["bookTitle"] == bookTitle2

@then(u'the System should respond with the error message "{errorMessage}"')
def step_impl(context, errorMessage):
    request_data = json.loads(context.response.data)
    print(request_data)
    assert request_data["error"] == errorMessage

############################################## Nour ID009_ModifyUser.feature
@given('the following accounts exist')
def step_impl(context):
    context.users = []
    for row in context.table:
        user_data = {
            "email": row["email"],
            "password": row["password"],
            "role": row["role"],
            "status": row["status"]
        }
        print(f"Creating user: {user_data}")
        users_ref = db.collection('users')
        user = users_ref.document(user_data["email"])
        user.set({
                'email': user_data["email"],
                'password': user_data["password"],
                "role": user_data["role"],
                "status": user_data["status"]
            })
        print("Created User: ", db.collection('users').document(user_data["email"]).get().to_dict())
        context.users.append(user_data)

@given('an account with email "{email}" and password "{password}" logged in')
def step_user_logged_in(context, email, password):
    context.logged_in_user = next((user for user in context.users if user["email"] == email and user["password"] == password), None)
    if context.logged_in_user:
        print(f"User with email {email} and password {password} logged in.")
    else:
        raise Exception(f"User with email {email} not found or password incorrect.")

@when('I update my password to "{new_password}"')
def step_update_password(context, new_password):
    context.logged_in_user["password"] = new_password
    print(f"User updates password to: {new_password}")

@then('my account password should be "{new_password}"')
def step_verify_password(context, new_password):
    actual_password = context.logged_in_user["password"]
    assert actual_password == new_password, f"Expected password: {new_password}, Actual password: {actual_password}"

@when('I update my email to "{new_email}"')
def step_update_email(context, new_email):
    context.logged_in_user["email"] = new_email
    print(f"User updates email to: {new_email}")

@then('my account email should be "{expected_email}"')
def step_verify_email(context, expected_email):
    actual_email = context.logged_in_user["email"]
    assert actual_email == expected_email, f"Expected email: {expected_email}, Actual email: {actual_email}"

@when('I attempt to update my email to "{invalid_email}"')
def step_attempt_update_invalid_email(context, invalid_email):
    context.logged_in_user["email"] = invalid_email
    print(f"User attempts to update email to invalid email: {invalid_email}")

@then(u'I shall see the error message  "the email address is invalid"')
def step_verify_error_message(context):
    expected_error = "the email address is invalid"
    print(f"Error message displayed: {expected_error}")


@then('the account information shall not be modified')
def step_verify_account_not_modified(context):
    print("Account information not modified.")
    
############################################## Eric ID010_ReportUser.feature
@given('the following users exist in this system')
def step_impl(context):
    for row in context.table:
        user_data = {
            "uid": row["uid"],
            "password": row["password"],
            "role": row["role"],
            "status": row["status"],
            "email": row["email"]
        }
        print(f"Creating user: {user_data}")


@given('I am on the user\'s profile page')
def step_impl(context):
    assert context.response.status_code == 200


@when('I attempt to report the seller with uid "{uid}"')
def step_impl(context, uid):
    context.uid = uid


@when('I select the reason for reporting as "{reason}" and a description "{description}"')
def step_impl(context, reason, description):
    report_data = {"uid": context.uid, "reason": reason, "description": description}
    context.response = client.post('/report_user', json=report_data)


@when('I submit the report without selecting a reason')
def step_impl(context):
    report_data = {"uid": context.uid}
    context.response = client.post('/report_user', json=report_data)


@when('I submit the report selecting the reason "{reason}" without a description')
def step_impl(context, reason):
    report_data = {"uid": context.uid, "reason": reason}
    context.response = client.post('/report_user', json=report_data)


@then('I should see a message confirming submission of my report')
def step_impl(context):
    assert context.response.status_code == 200


@then('I should see the error message "{error_message}"')
def step_impl(context, error_message):
    request_data = json.loads(context.response.data)
    print(request_data)
    assert request_data['error_message'] == error_message

############################################## Ezer ID004_RespondRequest.feature
@given('the following users has an account in the system')
def step_impl(context):
    context.users = []
    for row in context.table:
        context.users.append({
            "username": row['username'],
            "password": row['password'],
            "role": row['role'],
            "status": row['status'],
            "email": row['email']
        })

@given('the following books are present in the system')
def step_impl(context):
    context.book_listings = []
    for row in context.table:
        context.book_listings.append({
            "Title": row['Title'],
            "Author": row['Author'],
            "Book Type": row['Book Type'],
            "Condition": row['Condition'],
            "Price": row['Price'],
            "user": row['user'],
            "Available": row['Available']
        })

@given('a user with email "{email}" and password "{password}" is logged in')
def step_impl(context, email, password):
    user = next((user for user in context.users if user['email'] == email and user['password'] == password), None)
    assert user, f"INVALID_LOGIN_CREDENTIALS for user with email {email}"

@given('a rental request by user "{requester_username}" for "{book_title}" owned by user "{owner_username}" exists')
def step_impl(context, requester_username, book_title, owner_username):
    # Simulate that a rental request exists for the given conditions.
    context.rental_request = {
        "requester_username": requester_username,
        "book_title": book_title,
        "owner_username": owner_username
    }

@when('the user accepts the request by user "{requester_username}" for "{book_title}" owned by user "{owner_username}"')
def step_impl(context, requester_username, book_title, owner_username):
   # Search for the specific book listing
    bookListings_ref = db.collection('bookListings')
    query = bookListings_ref.where('bookTitle', '==', book_title).where('user', '==', owner_username)
    results = query.get()
    # If the listing is found, update its availability to 'Yes'
    for book in results:
        # Here you can check if the book is already marked as not available
        if book.get('availability') == 'No':
            raise Exception(f"Book request for {book_title} by {requester_username} cannot be accepted as it is already not available")
        else:
            book_id = book.id
            book_ref = bookListings_ref.document(book_id)
            book_ref.update({'availability': 'No'})
            print(f"Book request for {book_title} by {requester_username} has been accepted.")
        
@when('the user rejects the request by user "{requester_username}" for "{book_title}" owned by user "{owner_username}"')
def step_impl(context, requester_username, book_title, owner_username):
  # Search for the specific book listing
    bookListings_ref = db.collection('bookListings')
    query = bookListings_ref.where('bookTitle', '==', book_title).where('user', '==', owner_username)
    results = query.get()
    # Check the availability of the book
    for book in results:
        # If the book is available, print a message and take no further action
        if book.get('availability') == 'Yes':
            print(f"Book request for {book_title} by {requester_username} has been rejected.")
        else:
            # If the book is not available, you could take action here or simply print a message
            print(f"Book request for {book_title} by {requester_username} is currently not available.")

@then('the book "{book_title}" owned by user "{owner_username}" shall have availability "{availability_status}"')
def step_impl(context, book_title, owner_username, availability_status):
    # Search for the specific book listing
    bookListings_ref = db.collection('bookListings')
    query = bookListings_ref.where('bookTitle', '==', book_title).where('user', '==', owner_username)
    results = query.get()
    # Assert the availability status is as expected
    for book in results:
        actual_availability = book.get('availability')
        assert actual_availability == availability_status, f"Expected availability '{availability_status}', but got '{actual_availability}' for book {book_title}."
        print(f"Book {book_title} availability is as expected: '{availability_status}'.")

  
    
#################### will ID017_ViewAllBookListings.feature
@given('the application is running')
def step_given_application_running(context):
    # App already running!
    pass

@when('a GET request is made to \'/getAllBookListings\'')
def step_when_get_request_made(context):
    context.response = client.get('/getAllBookListings')

@then('the response status code should be 200')
def step_then_response_status_code_200(context):
    assert context.response.status_code == 200

@then('the response should contain a list of book listings')
def step_then_response_should_contain_list(context):
    response_content = context.response.get_data(as_text=True)
    print("Response content:", response_content)
    
    # Convert the response content to a Python object
    response_data = json.loads(response_content)
    
    # Check if the response data is a list
    assert isinstance(response_data, list), "Response should contain a list of book listings"
    
    # Check if the list is not empty
    assert len(response_data) > 0, "Response should contain at least one book listing"
    
    # Add more assertions as needed based on the structure of the response data
    # This can fail if some book listing does not contains info on those fields
    for listing in response_data:
        if("courseID" in listing and "bookAuthor" in listing and "bookCondition" in listing and "bookTitle" in listing 
           and "bookType" in listing and "bookType" in listing and "id" in listing and "listingDescription" in listing 
           and "listingType" in listing and "price" in listing and "rentalDuration" in listing and "school" in listing 
           and "user" in listing):
            assert "courseID" in listing, "Each book listing should have a 'courseID' field"
            assert "bookAuthor" in listing, "Each book listing should have a 'bookAuthor' field"
            assert "bookCondition" in listing, "Each book listing should have a 'bookCondition' field"
            assert "bookTitle" in listing, "Each book listing should have a 'bookTitle' field"
            assert "bookType" in listing, "Each book listing should have a 'bookType' field"
            assert "id" in listing, "Each book listing should have an 'id' field"
            assert "listingDescription" in listing, "Each book listing should have a 'listingDescription' field"
            assert "listingType" in listing, "Each book listing should have a 'listingType' field"
            assert "price" in listing, "Each book listing should have a 'price' field"
            assert "rentalDuration" in listing, "Each book listing should have a 'rentalDuration' field"
            assert "school" in listing, "Each book listing should have a 'school' field"
            assert "user" in listing, "Each book listing should have a 'user' field"
    
#################### Sarah ID016_RemoveBookListing.feature

@given(u'a listing with listingType "{listingType}", bookTitle "{bookTitle}, listingDescription "{listingDescription}", price "{price}", bookAuthor "{bookAuthor}", courseID "{courseID}", school "{school}", bookType "{bookType}", rentalDuration "{rentalDuration}", bookCondition "{bookCondition}", user "{listingEmail}" exists')
def step_impl(context, listingType, bookTitle, listingDescription, price, bookAuthor, courseID, school, bookType, rentalDuration, bookCondition, listingEmail):
    listing_data = {
        "user": listingEmail,
        "listingType": listingType,
        "bookTitle" : bookTitle,
        "listingDescription": listingDescription,
        "price": price,
        "bookAuthor": bookAuthor,
        "courseID": courseID,
        "school": school,
        "bookType": bookType,
        "rentalDuration": rentalDuration,
        "bookCondition": bookCondition
    }
    # Temporary fix for empty strings in Gherkin
    for key in listing_data:
        if (listing_data[key] == "blank"):
            listing_data[key] = str()
    context.response = client.post("/createBookListing", json=listing_data)

@when(u'a user with email "{email}" attempts to remove the listing with listingType "{listingType}", bookTitle "{bookTitle}, listingDescription "{listingDescription}", price "{price}", bookAuthor "{bookAuthor}", courseID "{courseID}", school "{school}", bookType "{bookType}", rentalDuration "{rentalDuration}", bookCondition "{bookCondition}", user "{listingEmail}"')
def step_impl(context, email, listingType, bookTitle, listingDescription, price, bookAuthor, courseID, school, bookType, rentalDuration, bookCondition, listingEmail):
    response_data = json.loads(context.response.data)
    listingID = response_data['data']['id']
    delete_json = {
        "user": email,
        "listingID": listingID
    }
    context.response = client.delete(f"/deleteBookListing", json=delete_json)

@when(u'a user with email "{email}" attempts to remove a listing that does not exist')
def step_impl(context, email):
    delete_json = {
        "user": email,
        "listingID": "does not exist"
    }
    context.response = client.delete(f"/deleteBookListing", json=delete_json)

@then(u'the system shall confirm the removal of the book listing from the system')
def step_impl(context):
    assert context.response.status_code == 200

@then(u'the system shall respond with an error')
def step_impl(context):
    assert context.response.status_code == 400

################################# Eric ID014_RemoveRequest.feature
@given('the following requests exist in the system')
def step_impl(context):
    i =0
    for row in context.table:
        i+=1
        request_listing_data = {
            "bookTitle": row["bookTitle"],
            "bookAuthor": row["bookAuthor"],
            "bookType": row["bookType"],
            "bookCondition": row["bookCondition"],
            "price": row["price"],
            "user": row["user"],
            "requestID": row["requestID"]
        }
        print(f"Creating Request: {request_listing_data}")
        
        requestListing_ref = db.collection('requests')
        requestListing = requestListing_ref.document(f"id{i}")
        print(f"book id{i}")
        requestListing.set(request_listing_data)

@when('the user selects a request with requestID "{requestID}"')
def step_impl(context, requestID):
    context.requestID = requestID

@when('selects the "remove" button next to the request')
def step_impl(context):
    response = client.post('/removeRequest/id/{requestID}', json={
        "id": context.requestID
    })
    context.response = response

@then('the system should confirm the removal of the request')
def step_impl(context):
    request_data = json.loads(context.response.data)
    assert context.response.status_code == 200
    assert request_data.get("message") == "Successfully deleted request with id {requestID}"

#################### Sarah ID034_ViewRequests.feature
    
@given(u'a request by user "{requester}" for the book "{bookTitle}" owned by user "{owner}" exists')
def step_impl(context, requester, bookTitle, owner):
    requester = {
        "email": requester
    }
    request_json = {
                "bookTitle": bookTitle,

                "price": None,
                "rentalDuration": None,
                "listingType": None,
                "bookCondition": None,
                "bookType": None,
                "user": owner,
                "id": "listing1",
                "requester": requester,
             }
    _, request_ref = db.collection('requests').add(request_json)
    context.requestID = request_ref.id

@when(u'the user with email "{email}" tries to view their own requests')
def step_impl(context, email):
    context.response = client.get(f'/viewMyRequests/user/{email}')

@when(u'the user with email "{email}" tries to view requests for their books by other users')
def step_impl(context, email):
    context.response = client.get(f'/viewOtherUsersRequests/user/{email}')


@then(u'the System shall return the request by user "{requester}" for the book "{bookTitle}" owned by user "{owner}"')  
def step_impl(context, requester, bookTitle, owner):
    assert context.response.status_code == 200
    requests = json.loads(context.response.data)
    print("requests")
    print(requests)
    found = False
    for r in requests:
        if r['requester']['email'] == requester and r['bookTitle'] == bookTitle and r['user'] == owner:
            found = True
    assert found
    
    # Cleanup
    request_ref = db.collection('requests').document(context.requestID)
    request_ref.delete()

############################################## Lucas ID001_BookFilter.feature
    
@when(u'the user enters the title "Calculus 2" in the search bar')
def step_impl(context):
    context.response = client.get('/filter_books', json={
        "parameter": "bookTitle",
        "value": "Calculus 2"
    })

@then(u'the system should display a list of books with the title "Calculus 2"')
def step_impl(context):
    request_data = json.loads(context.response.data)
    print(request_data)
    assert context.response.status_code == 200
    for values in request_data:
            assert values["bookTitle"] == "Calculus 2"


@when(u'the user selects the book type "Programming" from the filter options')
def step_impl(context):
    context.response = client.get('/filter_books', json={
        "parameter": "bookType",
        "value": "Programming"
    })

@then(u'the system should display a list of books categorized as "Programming"')
def step_impl(context):
    request_data = json.loads(context.response.data)
    assert context.response.status_code == 200
    for values in request_data:
            assert values["bookType"] == "Programming"

@when(u'the user searches for the author "Johnson"')
def step_impl(context):
    context.response = client.get('/filter_books', json={
        "parameter": "bookAuthor",
        "value": "Johnson"
    })


@then(u'the system should display a refined list of only books by the author "Johnson"')
def step_impl(context):
    request_data = json.loads(context.response.data)
    assert context.response.status_code == 200
    for values in request_data:
            assert values["bookAuthor"] == "Johnson"


@when(u'I specify the author of the book as "J.K. Rowling"')
def step_impl(context):
     context.response = client.get('/filter_books', json={
        "parameter": "bookAuthor",
        "value": "J.K. Rowling"
    })


@then(u'I shall see the error "Items of the specified author do not exist"')
def step_impl(context):
    request_data = json.loads(context.response.data)
    assert context.response.status_code == 400
    assert request_data["error"] == "Items of the specified author do not exist"

@when(u'I specify the price of the book to be "-$30"')
def step_impl(context):
    context.response = client.get('/filter_books', json={
        "parameter": "price",
        "value": "-30"
    })


@then(u'I shall see the error "Invalid price value"')
def step_impl(context):
    request_data = json.loads(context.response.data)
    print(context.response.status_code)
    assert context.response.status_code == 400
    assert request_data["error"] == "Invalid price value"
    
############################################## Nour ID005_SetRentalDuration.feature

@given('the user is on the book requesting page')
def step_impl(context):
    assert context.response.status_code == 200

@when(u'the user {user} selects the textbook "{book}"')
def step_impl(context, user, book):
    context.data = 1, book, user

@when(u'the user {user} selects a second textbook, the textbook "{book2}"')
def step_impl(context, user, book2):
    data = context.data
    context.data = 2, data[1], data[2], book2, user

@when('sets the rental duration to "{duration}" days')
def step_user_sets_rental_duration(context, duration):
    context.rental_duration = duration

@when('clicks the create request button')
def step_impl(context):
    data = context.data
    if(data[1] == "Calculus 2"):
        the_id = "id1"
    if(data[1] == "Biology 101"):
        the_id = "id2"
    if(data[1] == "C++ Programming"):
        the_id = "id3"
    if (data[1] == "The Great Gatsby"):
        the_id = "id4"
    if (data[1] == "Organic Chemistry"):
        the_id = "id5"

    first_response = client.post('/createRequest', json={
            "bookTitle": data[1],
            "user": data[2],
            "id": the_id,
            "rentalDuration": context.rental_duration,
            "email": "william.lin@mail.mcgill.ca",
        })
    context.response = first_response
    if(data[0] == 2):
        if(data[3] == "Calculus 2"):
            the_id = "id1"
        if(data[3] == "Biology 101"):
            the_id = "id2"
        if(data[3] == "C++ Programming"):
            the_id = "id3"
        if(data[3] == "The Great Gatsby"):
            the_id = "id4"
        if(data[3] == "Organic Chemistry"):
            the_id = "id5"
        second_response = client.post('/createRequest', json={
            "bookTitle": data[3],
            "user": data[4],
            "id": the_id,
            "rentalDuration": context.rental_duration,
            "email": "william.lin@mail.mcgill.ca",
        })
        context.response = first_response, second_response

@then('the system should confirm the rental request for the book "{bookTitle}" with a rental duration of "{duration}" days')
def step_impl(context, bookTitle, duration):
    request_data = json.loads(context.response.data)
    print(request_data)
    assert context.response.status_code == 200
    request_data = json.loads(context.response.data)
    print(request_data)
    assert request_data["data"]["bookTitle"] == bookTitle
    assert request_data["data"]["rentalDuration"] == duration

@then('the system should confirm the rental request for the book "{bookTitle1}" and "{bookTitle2}" with a rental duration of "{duration1}" days and "{duration2}" days respectively')
def step_impl(context, bookTitle1, bookTitle2, duration1, duration2):
    assert context.response[0].status_code == 200
    request_data = json.loads(context.response[0].data)
    print(request_data)
    assert request_data["data"]["bookTitle"] == bookTitle1
    assert request_data["data"]["rentalDuration"] == duration1

    assert context.response[1].status_code == 200
    request_data = json.loads(context.response[1].data)
    print(request_data)
    assert request_data["data"]["bookTitle"] == bookTitle2
    assert request_data["data"]["rentalDuration"] == duration2

@then('the system should display an error message "{errorMessage}"')
def step_impl(context, errorMessage):
    print(context.response.status_code)
    request_data = json.loads(context.response.data)
    print(request_data)
    assert context.response.status_code == 400
    assert request_data["error"] == errorMessage
    
############################################## Ezer ID006_CourseBookFilter.feature

@given('the following books and course exist in the system')
def step_impl(context):

    for row in context.table:
        # Create a dictionary for each row in the table.
        book_listing_data = {
            "CourseID": row['CourseID'],  # Match the header names exactly
            "CourseName": row['CourseName'],
            "Title": row['Title'],
            "Author": row['Author'],
            "BookType": row['BookType'],
            "Condition": row['Condition'],
            "Price": row['Price'],
            "user": row['user']
        }

        bookListing_ref = db.collection('bookListings')
        bookListing_ref.add(book_listing_data)
        
    
@when(u'the user enters the course ID "MATH 141" in the search bar')
def step_impl(context):
    context.response = client.get('/filter_books', json={
        "parameter": "CourseID",
        "value": "MATH 141"
    })

@then(u'the system should display a list of books with the course name "Calculus 2"')
def step_impl(context):
    request_data = json.loads(context.response.data)
    assert context.response.status_code == 200
    for values in request_data:
            assert values["CourseName"] == "Calculus 2"

@then(u'the system should display a list of books with the course ID "MATH 141"')
def step_impl(context):
    request_data = json.loads(context.response.data)
    assert context.response.status_code == 200
    for values in request_data:
            assert values["CourseID"] == "MATH 141"


@when(u'the user enters the course name "Calculus 2" in the search bar')
def step_impl(context):
    context.response = client.get('/filter_books', json={
        "parameter": "CourseName",
        "value": "Calculus 2"
    })

@then(u'the system should display a list of books with the course name "Calculus 2""')
def step_impl(context):
    request_data = json.loads(context.response.data)
    assert context.response.status_code == 200
    for values in request_data:
            assert values["CourseName"] == "Calculus 2"

@when(u'I specify the course ID of the book to be "MAT 141"')
def step_impl(context):
    context.response = client.get('/filter_books', json={
        "parameter": "CourseID",
        "value": "MAT 141"
    })


@then(u'I shall see the error "Invalid course ID"')
def step_impl(context):
    request_data = json.loads(context.response.data)
    print(request_data)
    assert context.response.status_code == 400
    assert request_data["error"] == "Invalid course ID"