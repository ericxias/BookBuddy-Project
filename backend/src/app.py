from book_functions import Book_functions
from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
import requests
import firebase_admin
import os
from firebase_admin import auth
web_api_key = os.getenv("FIREBASE_WEB_API_KEY", "")


# pip install firebase-admin pyjwt

#from book_functions import Book_functions

app = Flask(__name__)

CORS(app, supports_credentials=True)

def start_app():

    book_functions = Book_functions()

    @app.route('/')
    @cross_origin(supports_credentials=True)
    def hello_world():
        return 'Hello world!'
    
    # To login when doing the post the email, password and return secure token field need to be filled in (usually set to True)
    # More info can be found here https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password 
    # If the status as string "200" is returned the user exist and can proceed to next page (i.e. login) otherwise login failed
    @app.route('/login', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def login_user():
        try:
            login_json = request.get_json()
            email = login_json.get("email")
            password = login_json.get("password")
            returnSecureToken = login_json.get("returnSecureToken")
            
            # Assuming book_functions.login_user returns True if login is successful
            if book_functions.login_user(email, password, returnSecureToken, web_api_key):
                return jsonify({"success": True, "message": "Login successful"}), 200
            else:
                return jsonify({"success": False, "message": "Invalid email or password"}), 401

        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500
        
    #create account using email, password and returnsecuretken 
    #for more information : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    #successful status code is 200, endpoint /signup
    @app.route('/signup', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def create_account():
        try:
            signup_json = request.get_json()
            email = signup_json.get("email")
            password = signup_json.get("password")
            returnSecureToken = signup_json.get("returnSecureToken")
            
            # Call the create_account function from Book_functions
            signup_response = book_functions.create_account(email, password, returnSecureToken, web_api_key)

            # Check if account creation was successful based on response
            if signup_response.ok:
                # Account created successfully
                # Now, you might want to do additional tasks like storing user information in your database
                # For Firebase, user accounts are automatically created upon successful signup
                return jsonify({"success": True, "message": "Account created successfully", "data": signup_response.json()}), 200
            else:
                # Account creation failed
                print(signup_response.text)
                return jsonify({"success": False, "error": "Account creation failed"}), 400

        except Exception as e:
            print(e)  # Print the exception
            return jsonify({"success": False, "error": str(e)}), 500
        
        
    # Account sign out
    #for more information : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    #successful status code is 200, endpoint /signup
    @app.route('/signout', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def sign_out():
        try:
            # Delete the user's token from your database or wherever you stored it
            # For example, if you stored it in session:
            session.pop('user', None)
            
            return jsonify({"success": True, "message": "Signed out successfully"}), 200
        except Exception as e:
            print(e)  # Print the exception
            return jsonify({"success": False, "error": str(e)}), 500
              
    #modify user information(email, username, password)
    #successful status code is 200
    @app.route('/modify_user', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def modify_user():
        try:
            modify_json = request.get_json()
            uid = modify_json.get("uid")
            updated_email = modify_json.get("updated_email")
            updated_username = modify_json.get("updated_username")
            updated_password = modify_json.get("updated_password")
            modify_response = book_functions.modify_user(uid, updated_email, updated_username, updated_password, web_api_key)
            return jsonify(modify_response)
        except Exception as e:
            return jsonify({"error": str(e)})
        
    #report user
    #successful status code is 200
    @app.route('/report_user', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def report_user():
        try:
            report_json = request.get_json()
            email = report_json.get("email")
            reason = report_json.get("reason")
            description = report_json.get("description")
            report_response = book_functions.report_user(email, reason, description)
            return jsonify(report_response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    #create book listing
    @app.route('/createBookListing', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def create_book_listing():
        try:
            listing_json = request.get_json()
            listing_response = book_functions.create_book_listing(listing_json)
            return jsonify(listing_response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    #delete all book listing (to clean up database)
    @app.route('/deleteAllBookListings', methods=["DELETE"])
    @cross_origin(supports_credentials=True)
    def delete_all_book_listings():
        try:
            response = book_functions.delete_all_book_listings()
            return jsonify(response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    #delete specific book listing by id
    @app.route('/deleteBookListing', methods=["DELETE"])
    @cross_origin(supports_credentials=True)
    def delete_book_listing_by_id():
        try:
            delete_json = request.get_json()
            response = book_functions.delete_book_listing_by_id(delete_json)
            return jsonify(response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    #Remove Request (atreyi)
    @app.route('/removeRequest/id/<id>', methods=["DELETE"])
    @cross_origin(supports_credentials=True)
    def remove_request(id):
        try:
            response = book_functions.remove_request(id)
            return jsonify(response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    #create Request (will)
    @app.route('/createRequest', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def create_request():
        try:
            request_json = request.get_json()
            request_response = book_functions.create_request(request_json)
            if "error" in request_response:
                return jsonify(request_response), 400
            else:
                return jsonify(request_response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
    #View Requests (Sarah)
    @app.route('/viewMyRequests/user/<user>', methods=["GET"])
    @cross_origin(supports_credentials=True)
    def view_requests(user):
        try:
            #request_json = request.get_json()
            request_response = book_functions.view_my_requests(user)
            return jsonify(request_response), 200
        except Exception as e:
            print(str(e))
            return jsonify({"error": str(e)}), 400
    
    @app.route('/viewOtherUsersRequests/user/<user>', methods=["GET"])
    @cross_origin(supports_credentials=True)
    def view_requests_by_other_users(user):
        try:
            request_response = book_functions.view_requests_by_other_users(user)
            return jsonify(request_response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    # Get all book listings (will)
    @app.route('/getAllBookListings', methods=['GET'])
    def get_all_book_listings():
        try:
            response = book_functions.get_all_book_listings()
            return jsonify(response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    # accept rental request
    @app.route('/accept_rental_request', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def accept_rental_request():
        try:
            # Get the JSON data from the request
            data = request.get_json()
            book_title = data.get("book_title")
            owner_ref = data.get("owner_ref")
            
            request_ref = data.get("request_id")
            # Call the accept_rental_request method from the Book_functions class
            response = book_functions.accept_request_reqid(book_title, owner_ref, request_ref)
            print(response)
            return jsonify(response), 200 if response == "Request accepted and book availability updated" else 400
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    # refuse rental request
    @app.route('/reject_rental_request', methods=["POST"])
    @cross_origin(supports_credentials=True)
    def reject_rental_request():
        try:
            # Get the JSON data from the request
            data = request.get_json()
            book_title = data.get("book_title")
            owner_ref = data.get("owner_ref")
            
            # Call the reject_rental_request method from the Book_functions class
            response = book_functions.reject_request(book_title, owner_ref)
            return jsonify(response), 200 if response == "Request rejected" else 400
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    # send message
    @app.route('/send_message', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def send_message():
        try:
            # Get the JSON data from the request
            data = request.get_json()
            sender_id = data.get("sender_id")
            receiver_id = data.get("receiver_id")
            message = data.get("message")
            
            # Call the send_message method from the Book_functions class
            response = book_functions.send_message(sender_id, receiver_id, message)
            return jsonify(response), 200 if response.get("success") else 400
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500
    
    # Search by course criteria
    @app.route('/search_by_course/<course>', methods=['GET'])
    @cross_origin(supports_credentials=True)
    def search_by_course(course):
        try:
            response = book_functions.search_by_course(course)
            return jsonify(response), 200
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 400
        
    #########  Book Filter features Will #########
    # Works even for courseID (search by course)
    # Example of uses (Get request): http://localhost:5000/filter_books?parameter=bookCondition&value=New
    
    # How to use the filter_books endpoint:
    # http://localhost:5000/filter_books?parameter=<Field of book listing>&value=<Value to filter by>
        
    # More example of JSON Get request:
    # http://localhost:5000/filter_books?parameter=bookTitle&value="The%20Best%20of%20Best"
    # http://localhost:5000/filter_books?parameter=bookAuthor&value="John"
    # http://localhost:5000/filter_books?parameter=price&value=95
    # http://localhost:5000/filter_books?parameter=user&value=test@mail.com
    # http://localhost:5000/filter_books?parameter=rentalDuration&value=N/A
    # http://localhost:5000/filter_books?parameter=school&value=McGill
    # http://localhost:5000/filter_books?parameter=listingType&value=sell
    @app.route('/filter_books', methods=["GET"])
    @cross_origin(supports_credentials=True)
    def filter_books():
        data = request.get_json()
        parameter = data.get('parameter')
        value = data.get('value')
        if parameter and value:
            try:
                    filtered_books = book_functions.filter_books(parameter, value)
                    if "error" in filtered_books:
                        return jsonify(filtered_books), 400
                    else:
                        return jsonify(filtered_books)
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        else:
            return jsonify({"error": "Both parameter and value are required"}), 400

    #########  End for Book Filter features #########

    return app


    

    
app = start_app()

if __name__ == "__main__":
    app.run()
