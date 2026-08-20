from book_functions import Book_functions
import firebase_admin
from firebase_admin import credentials, firestore, auth
import pytest
import time

book_functions = Book_functions()

class TestPerformance:
    # Lucas ID024
    def test_ten_concurent(self):
        web_api_key = "AIzaSyBBQ6E0wGV9XuYH9rRhsgKFc5iDoYouQtM"

        # Create 10 Users
        user1 = print(book_functions.create_account("TUC1@mail.com", "ECSE428", "true", web_api_key))
        user2 = book_functions.create_account("TUC2@mail.com", "ECSE428", "true", web_api_key)
        user3 = book_functions.create_account("TUC3@mail.com", "ECSE428", "true", web_api_key)
        user4 = book_functions.create_account("TUC4@mail.com", "ECSE428", "true", web_api_key)
        user5 = book_functions.create_account("TUC5@mail.com", "ECSE428", "true", web_api_key)
        user6 = book_functions.create_account("TUC6@mail.com", "ECSE428", "true", web_api_key)
        user7 = book_functions.create_account("TUC7@mail.com", "ECSE428", "true", web_api_key)
        user8 = book_functions.create_account("TUC8@mail.com", "ECSE428", "true", web_api_key)
        user9 = book_functions.create_account("TUC9@mail.com", "ECSE428", "true", web_api_key)
        user10 = book_functions.create_account("TUC10@mail.com", "ECSE428", "true", web_api_key)
        

        # Sign in 10 Users
        assert book_functions.login_user("TUC1@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC1@mail.com"
        assert book_functions.login_user("TUC2@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC2@mail.com"
        assert book_functions.login_user("TUC3@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC3@mail.com"
        assert book_functions.login_user("TUC4@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC4@mail.com"
        assert book_functions.login_user("TUC5@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC5@mail.com"
        assert book_functions.login_user("TUC6@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC6@mail.com"
        assert book_functions.login_user("TUC7@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC7@mail.com"
        assert book_functions.login_user("TUC8@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC8@mail.com"
        assert book_functions.login_user("TUC9@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC9@mail.com"
        assert book_functions.login_user("TUC10@mail.com", "ECSE428", "true", web_api_key)[1] == "TUC10@mail.com"
    
    # Sarah ID023
    def test_handle_accounts(self):
        numOfUsers=100
        try:
            ids = []
            for i in range(0, numOfUsers):
                user_json = {"email": f"id023test{i}@mail.com"}
                user_ref = book_functions.db.collection('users').document()
                user_ref.set(user_json)
                ids.append(user_ref.id)

            time.sleep(2)
        except:
            assert False
        finally: 
            # Cleanup
            for i in range(0, numOfUsers):
                user_ref = book_functions.db.collection('users').document(ids[i])
                user_ref.delete()

    # Sarah ID025
    def test_system_response(self):
        numTrials = 10
        limit = 10 # response within 10 seconds
        percentage = 0.9 # 90% of the time
        try:
            times=[]
            for i in range(0, numTrials):
                start = time.perf_counter()
                book_functions.get_all_book_listings()
                end = time.perf_counter()
                times.append(end-start)
            
            greater = 0 # number of trials greater than the limit
            for t in times:
                if (t > limit):
                    greater+=1
            
            assert greater <= numTrials*percentage
         
        except:
            assert False
        
        




