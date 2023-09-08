# authentication

## Introduction

Hello and welcome to my **Authentication Project with Express.js**—This project I have created to enhanced my backend development skills using the Express.js framework.

Throughout this project, I've gained valuable hands-on experience in setting up an Express.js application, managing user data with Sequelize, ensuring password security via hashing, crafting user registration and login routes, and incorporating basic access control.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (version x.x.x)
- npm (version x.x.x)

## Installation

Follow these steps to install and set up the authentication system:

1. Clone the repository to your local machine: git clone git@github.com:kusum-chowdhury/authentication.git

2. Navigate to the project directory:

3. Install dependencies using npm: npm install

4. Open terminal and type 'node index.js' and press the Enter

5. Open browser and go to: "http://localhost:8000/"

## File Structure

- **`/config`**: Contains configuration files for the database.
- **`/models`**: Holds the data models or schema definitions for the database.
- **`/routes`**: Contains the route handlers for different endpoints of the API.
- **`/public`**: Contains static files like HTML templates (index.html, signup.html, login.html), stylesheets, and client-side JavaScript files.
- **`/tests`**: Includes test files for automated testing of the application.
- **`app.js`**: The main entry point of the application.
- **`package.json`**: Contains metadata about the project and its dependencies.


## Key Features

1. **User Sign-Up:** Users can easily register new accounts by providing their name, email, and password.

2. **User Sign-In:** Registered users have the ability to log into the application using their email and password.

3. **Password Hashing:** To ensure maximum security, passwords are securely hashed using the bcrypt library before storage.

4. **Validation:** I've meticulously implemented validation logic to ensure user input meets necessary criteria, ensuring data integrity.

5. **Database Interaction:** User data is seamlessly managed through an SQLite database using Sequelize as my chosen ORM tool.

2. **User Log-Out:** Logged In users have the ability to log out and it will delete the cookie and redirect the user to the index.html again.

## Usage:

### Sign Up

To create a new account, follow these steps:

1. Click on Sign Up button.
2. Fill out the required fields: [Name, Email, Password].
3. Click the "Sign in" button.
4. Upon successful registration, you will alert message.

### Login

To log in to your account, follow these steps:

1. Navigate to the login page.
2. Enter your email address and password.
3. Click the "Login" button.
4. Upon successful login, you will be redirected to the logout page.

### Logging Out

To log out of your account, click the "Logout" button and you will get redirected to the index.html page.

## Authentication Flow
### User Registration Flow

1. User navigates to the sign up page.
2. User provides necessary information (name, email, password, etc.).
3. System validates the provided data (e.g., checks for valid email format, unique email address).
4. If data is valid, the system creates a new user record and stores it in the database.
5. User get alert message if the registration was successful

### User Login Flow

1. User navigates to the login page.
2. User enters their registered email address and password.
3. System verifies the credentials against the stored data.
4. If credentials are valid, the system creates a session and logs the user in.
5. User is redirected to the logout page.

### Logout Flow

1. User clicks the "Logout" button in the application.
2. System terminates the session and logs the user out.
3. User is redirected to the index.html page.

## API Endpoints

### 1. Register User

- **URL**: `/api/v1/signup`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  - `name` (string): User's name should be at least 5 character long
  - `email` (string): User's email address
  - `password` (string): User's password should have at least one capital letter, one special character and digits
- **Response**:
  - `status` (integer): 200
  - `message` (string): `Welcome ${createdUser.name}, thanks for signing up`

**Request:**

```json
POST /api/v1/signin

Request Body:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "secretpassword@123"
}

Response:
{
  "status": 201,
  "message": "User registered successfully"
}
```

### 1. Login User

- **URL**: `/api/v1/login`
- **Method**: `POST`
- **Description**: Authenticates a user and generates a session token.
- **Request Body**:
  - `email` (string): User's email address
  - `password` (string): User's password
- **Response**:
  - `status` (integer): 200
  - `message` (string): "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

**Request:**

```json
POST /api/v1/login

Request Body:
{
  "email": "john.doe@example.com",
  "password": "secretpassword@123"
}

Response:
{
  "status": 200,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Database Schema

### Table: users

The `users` table stores information about registered users.

| Column Name  | Data Type    | Constraints          | Description                           |
|--------------|--------------|---------------------|---------------------------------------|
| id           | INTEGER      | Primary Key, Auto Increment | Unique identifier for each user    |
| name         | STRING       | Not Null             | User's full name                      |
| email        | STRING       | Not Null, Unique     | User's email address (used for login) |
| password     | STRING       | Not Null             | Hashed password                        |
| created_at   | TIMESTAMP    | Default CURRENT_TIMESTAMP | Date and time of user registration |
| updated_at   | TIMESTAMP    | Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Date and time of last update |

- **id**: Unique identifier for each user. Automatically increments with each new user added.
- **name**: User's full name.
- **email**: User's email address. Must be unique and is used for login.
- **password**: Hashed version of the user's password.
- **created_at**: Timestamp recording the date and time of user registration.
- **updated_at**: Timestamp recording the date and time of the last update.

### Usage Notes:

- Ensure that the `email` field is unique to prevent duplicate accounts.
- Use appropriate encryption and security measures for storing passwords.
- The `created_at` and `updated_at` fields are automatically managed by the database.
