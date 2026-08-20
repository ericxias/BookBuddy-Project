import firebase_admin
from firebase_admin import credentials, firestore, auth
import requests
import json
bookListingsColl = "bookListings"
requestsColl = "requests"

class Book_functions:

    def __init__(self):
        cred = credentials.Certificate("keys.json")
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()
        self.auth = firebase_admin.auth


    # Modify user information using UID, updated email, and web_api_key
    def modify_user(self, uid, updated_email, updated_username, updated_password, web_api_key):
        try:
            user = self.auth.get_user(uid)
            user_properties = {
                "email": updated_email,
                "displayName": updated_username,
                "password": updated_password,
            }

            updated_user = self.auth.update_user(uid, **user_properties)

            update_data = {
                "idToken": user.tokens["id_token"],
                "displayName": updated_user.display_name,
                "email": updated_user.email,
                "password": updated_password,
                "returnSecureToken": False,
            }

            update_response = requests.post(f"https://identitytoolkit.googleapis.com/v1/accounts:update?key={web_api_key}", json=update_data)

            return update_response

        except auth.AuthError as e:
            return {"success": False, "error_message": str(e)}

        except Exception as e:
            return {"success": False, "error_message": str(e)}

    # Login user using email, password, returnSecureToken (usually set to True), and web_api_key
    def login_user(self, email, password, returnSecureToken, web_api_key):
        login_dict = {"email": email, "password": password, "returnSecureToken": returnSecureToken}
        login_json = json.dumps(login_dict)
        login_response = requests.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+str(web_api_key), login_json)
        if login_response.status_code == 200:
            user_data = login_response.json()
            user_id = user_data['localId']
            token = user_data['idToken']
            # Store the token in the Firestore database
            self.db.collection('users').document(user_id).set({'token': token}, merge=True)
            # Now you have the user's ID and token
        else:
                error_data = login_response.json()
                error_message = error_data.get('error', {}).get('message', 'Unknown error')
                print(f"Error logging in: {error_message}")
        return login_response, email


    # Create user using email, password, returnSecureToken (usually True), web_api_key
    def create_account(self,email, password, returnSecureToken, web_api_key):
        signup_dict = {"email": email, "password": password, "returnSecureToken": returnSecureToken}
        signup_json = json.dumps(signup_dict)
        signup_response = requests.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+str(web_api_key), signup_json)
        print(signup_response.json())
        if(signup_response.ok):
            user = self.db.collection("users").document(signup_response.json()["localId"])
            user.set({
                "email": email,
                "password": password,
                "uid": signup_response.json()["localId"]
            })
        return signup_response

    # Need to edit for step definitions (message when reporting self, and message with no reason)
    # for message when reporting self, might need to take in the current users email?
    # Report user using email, reason, description, and web_api_key
    def report_user(self, email, reason, description):
        try:
            if reason is None:
                raise Exception(f"Please select a reason for the report")
            user = self.auth.get_user_by_email(email)
            uid = user.uid  # Get the user's ID

            custom_claims = user.custom_claims or {}
            custom_claims.update({"reported": True, "report_reason": reason, "report_description": description})
            self.auth.update_user(uid, custom_claims=custom_claims)  # Use the user's ID here
            self.db.collection('users').document(uid).update({
                'reported': True,
                'report_reason': reason,
                'report_description': description
            })
            return {"success": True, "message": "User was reported successfully"}
        except Exception as e:
            return {"success": False, "error_message": str(e)}

    # Create new book listing
    def create_book_listing(self, listing_json):
        try:
            # Check that fields are valid
            for key in listing_json:
                if (listing_json[key] == ""):
                    raise Exception(f"Error: A field was empty")
                
            # Check that user exists
            if 'user' in listing_json: # TODO Remove this later
                email = listing_json['user']
                user = auth.get_user_by_email(email)

            listing_ref = self.db.collection(bookListingsColl).document()
            listing_ref.set(listing_json)
            listing_data = listing_ref.get().to_dict()
            listing_data["id"]=listing_ref.id
            listing_data["availability"] = "Yes"
            return {"message": "Successfully created book listing", "data": listing_data}
        
        except Exception as e:
            raise Exception(str(e))


    def get_all_book_listings(self, request=None):
        try:
            book_listings = self.db.collection(bookListingsColl).get()
            all_listings = []
            for listing in book_listings:
                listing_dict = listing.to_dict()
                listing_dict['id'] = listing.id
                all_listings.append(listing_dict)
            return all_listings
        except Exception as e:
            # Log the error or handle it appropriately
            print(f"Error fetching book listings: {e}")
            return []  # Return an empty list or raise a custom exception



    # Delete all book listings (for database clean up)
    def delete_all_book_listings(self):
        listings = self.db.collection(bookListingsColl).stream()
        deleted = 0
        for l in listings:
            l.reference.delete()
            deleted = deleted + 1
        return {"message": "Successfully deleted all book listings", "deleted": deleted}
    
    # Delete specific book listing by id
    def delete_book_listing_by_id(self, delete_json):
        # get book listing
        listingID = delete_json['listingID']
        listing_ref = self.db.collection(bookListingsColl).document(listingID)
        listing = listing_ref.get()

        if listing.exists:
            # check that user owns book listing
            currentUser = delete_json['user']
            listingUser = (listing_ref.get().to_dict())['user'] 
            if (listingUser != currentUser):
                raise Exception(f"User {currentUser} cannot delete listing owned by user {listingUser}")
            
            # delete listing
            listing_ref.delete()
            return {"message": f"Successfully deleted book listing with id {listingID}"}
        else:
            raise Exception(f"Listing with id {listingID} does not exist")

    #Remove request by id
    def remove_request(self, id):
        request_ref=self.db.collection("requests").document(id)
        booking_id = request_ref.get().to_dict().get("id")
        self.db.collection("bookListings").document(booking_id).update({"availability": "Yes"})
        request_ref.delete()
        return {"message": f"Successfully deleted request with id {id}"}

    def create_request(self, request_json):
        try:
            # Check that fields are valid
            for key in request_json:
                if (request_json[key] == ""):
                    raise Exception(f"Error: A field was empty")

            # Check that book listing exists and is available
            book_id = request_json['id']
            print(book_id)
            book_listing_ref = self.db.collection(bookListingsColl).document(book_id)
            book_listing = book_listing_ref.get()
            if not book_listing.exists:
                raise Exception("Error: Book listing does not exist")
            if book_listing.to_dict().get('availability') == "No" :
                raise Exception("Error: Book listing is not available")
            if book_listing.to_dict().get('availability') == "Pending" :
                raise Exception("Error: Book listing is currently pending a request")
            
            # Fetch the owner of the book listing
            owner_email = book_listing.to_dict()['user'] 
            owners = self.db.collection('users').where('email', '==', owner_email).stream()
            
            requester_email = request_json['email'] 
            requesters = self.db.collection('users').where('email', '==', requester_email).stream()
            requesters = list(requesters)

            if not requesters:
                raise Exception(f"No user found with email: {requester_email}")
            requester = requesters[0]

            # Add the requester's data to the request
            request_json['requester'] = {"email": requester.to_dict()['email']} 
            
            if 'rentalDuration' in request_json:
                if (int(request_json['rentalDuration'])<0):
                    raise Exception("Invalid rental duration")
            # Reorder the fields in request_json
            request_json = {
                "bookTitle": request_json['bookTitle'],

                "price": request_json['price'] if 'price' in request_json else None,
                "rentalDuration": request_json['rentalDuration'] if 'rentalDuration' in request_json else None,
                "listingType": request_json['listingType'] if 'listingType' in request_json else None,
                "bookCondition": request_json['bookCondition'] if 'bookCondition' in request_json else None,
                "bookType": request_json['bookType'] if 'bookType' in request_json else None,
                "user": request_json['user'],
                "id": request_json['id'],
                "requester": request_json['requester'],
            }

            # Update book listing status
            book_listing_ref.update({"availability": "Pending"})
            self.db.collection('requests').add(request_json)

            return {"message": "Successfully created request", "data": request_json}
        except Exception as e:
            return {"error": str(e), "type": str(type(e))}
        
    def accept_request(self, user_id, book_id):
        """Accept a book request"""
        # Attempt to retrieve the request document from the 'requests' collection
        request_ref = self.db.collection('requests').document(user_id)
        request_doc = request_ref.get()
        
        if request_doc.exists:
            # Check if the request is for the correct book
            if request_doc.to_dict().get('book_id') == book_id:
                # Update the request status to 'accepted'
                request_ref.update({'status': 'accepted'})
                # Retrieve the book document from the 'books' collection
                book_ref = self.db.collection('books').document(book_id)
                book_doc = book_ref.get()
                if book_doc.exists:
                    # Update the book's availability to 'No'
                    book_ref.update({'available': False})
                    return 'Request accepted and book availability updated'
                else:
                    return 'Book does not exist'
            else:
                return 'Request for this book does not exist'
        else:
            return 'Request does not exist'

    def accept_request_reqid(self, bookTitle, book_id, request_id):
        """Accept a book request"""
        # Attempt to retrieve the request document from the 'requests' collection
        request_ref = self.db.collection('requests').document(request_id)
        request_doc = request_ref.get()
        # Check if the request is for the correct book
        print(request_doc.to_dict().get('id'))
        if request_doc.to_dict().get('id') == book_id:
            # Update the request status to 'accepted'
            request_ref.update({'status': 'accepted'})
            # Retrieve the book document from the 'books' collection
            book_ref = self.db.collection('bookListings').document(book_id)
            book_doc = book_ref.get()
            print(book_doc)
                # Update the book's availability to 'No'
            book_ref.update({'availability': "No"})
            requested_rental_duration = self.db.collection('requests').document(request_id).get().to_dict()['rentalDuration']
            print(requested_rental_duration)
            print(self.db.collection('requests').document(request_id).get().to_dict())
            book_ref.update({'rentalDuration': str(requested_rental_duration)})
            return 'Request accepted and book availability updated'
        else:
            return 'Request for this book does not exist'
        
    def reject_request(self, request_id, book_id):
        """Reject a book request"""
        # Attempt to retrieve the request document from the 'requests' collection
        request_ref = self.db.collection('requests').document(request_id)
        request_doc = request_ref.get()
        
        if request_doc.exists:
            # Check if the request is for the correct book
            if request_doc.to_dict().get('id') == book_id:
                # Update the request status to 'rejected'
                request_ref.update({'status': 'rejected'})
                # No need to change the book's availability as it remains 'Yes'
                return 'Request rejected'
            else:
                return 'Request for this book does not exist'
        else:
            return 'Request does not exist'
        
    # View Requests by the currently logged in user
    def view_my_requests(self, requester):
        try:
            # Retrieve requests where the requester's email is the currently logged in user
            requests_query = self.db.collection(requestsColl).where('requester.email', '==', requester).stream()
            requests = []
            for r in requests_query:
                r_dict = r.to_dict()
                r_dict['id'] = r.id
                requests.append(r_dict)
            return requests
        except Exception as e:
            raise Exception(str(e))
    
    # View requests by other users for current user's books
    def view_requests_by_other_users(self, user):
        try:
            # Retrieve requests for books owned by the currently logged in user
            requests_query = self.db.collection(requestsColl).where('user', '==', user).stream()
            requests = []
            for r in requests_query:
                r_dict = r.to_dict()
                r_dict['requestId'] = r.id
                requests.append(r_dict)
            return requests
        except Exception as e:
            raise Exception(str(e))

    #Search for book listings by course name
    def search_by_course(self, course):
        try:
            # Retrieve book listings with the specified course name
            book_listings = self.db.collection(bookListingsColl).where('courseID', '==', course).stream()
            listings = []
            for l in book_listings:
                l_dict = l.to_dict()
                l_dict['id'] = l.id
                listings.append(l_dict)
            if not listings:
                raise Exception("Error: No book listings found with {course}")
            return listings
        except Exception as e:
            return {"error": str(e), "type": str(type(e))}


#########  Book Filter features #########
        
    #filter book listings
    def filter_books(self, parameter, value):
        try:
            if(parameter == "price"):
                if(int(value) < 0):
                    raise Exception("Invalid price value")

            else:
                book_listings = self.db.collection(bookListingsColl).where(parameter, '==', value).get()
                if(str(parameter).lower() == "bookauthor" or str(parameter).lower() == "author"):
                    if(len(book_listings) == 0):
                        raise Exception("Items of the specified author do not exist")
                if(str(parameter).lower() == "courseid"):
                    if(len(book_listings) == 0):
                        raise Exception("Invalid course ID")
                if(str(parameter).lower() == "booktitle" or str(parameter).lower() == "title"):
                    if(len(book_listings) == 0):
                        raise Exception("Items of the specified title do not exist")
                if(len(book_listings) == 0):
                    raise Exception("Book Listing does not exist")
                else:
                    listings = []
                    for l in book_listings:
                        l_dict = l.to_dict()
                        l_dict['id'] = l.id
                        listings.append(l_dict)
                    return listings
        except Exception as e:
            return {"error": str(e)}

#########  END for Book Filter features #########
