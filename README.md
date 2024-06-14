# Twitter Clone with React.js and Django REST Framework

## Description
This is a Twitter clone built using React.js for the frontend and Django REST Framework for the backend. It also utilizes Tailwind CSS for styling and React Query for data fetching and state management.

![Twitter Clone Preview](frontend/src/assets/preview.gif)

## Features
- Post tweets
- Delete tweets
- Comment on tweets
- Like tweets
- Retweet
- Follow and unfollow users
- Edit profile
- Search for users

## Installation
Follow these steps to set up the ChatApp on your local machine:

1. Clone the repository:
   ```
   git clone https://github.com/17sTomy/twitter-clone.git
   ```
2. Install the required dependencies using npm:
   ```
   npm install
   ``` 
3. Set up the Django backend. Create a virtual environment and activate it:
    ```
   python -m venv .venv
   .venv/scripts/activate
   ``` 
4. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Apply migrations to set up the database:
   ```
   cd backend
   python manage.py migrate
   ```
6. Run the development server:
   ```
   python manage.py runserver
   ```
7. In a separate terminal, navigate to the frontend directory:
   ```
   cd frontend
   npm run dev
   ```