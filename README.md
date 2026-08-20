# ECSE428_BOOK
WINTER 2024 GROUP PROJECT

## Firebase

At root directory `npm install`

## Frontend

For the frontend user credential system (User login, user account creation, user password reset, user forgot password, user logout, and user change email(currently disabled in our Firebase), we followed this step-by-step method to communicate with our Firebase database: https://www.youtube.com/watch?v=d14HJiM82yA.

In the /frontend directory

`npm install` to install packages and dependencies

`npm start` to launch the frontend

## Backend

In the /backend directory 

Make sure to install necessary libraries such as flask, flask_cors, firebase admin, requests

You may use `pip install flask`, `pip install flask_cors`, `pip install firebase admin`, `pip install requests` to download and may need to install at backend/src

### Keys
Be sure to add the keys.json in backend/src

For some users you may have to put full path to keys.json in book_functions.py

For example at `cred = credentials.Certificate("keys.json")` instead of `"keys.json"` it could be `/Users/MyName/Folder1/ECSE428_BOOK/backend/src/keys.json`

### Run Backend
To run back `flask run` and is now at url `http://127.0.0.1:5000`

### Story Tests
Install behave: `pip install behave`

Run story tests: `behave`

### Unit Tests (Performance Tests)
Install pytest: `pip install -U pytest`

Run unit tests: `pytest`

More information: https://docs.pytest.org/en/7.1.x/index.html

