
# Library Management Web App

This is a Library Management Web Application built with Node.js, Express.js, and MongoDB. The application focuses primarily on user authentication with login and register functionalities. Passwords are securely hashed using the `bcrypt` library. The `zod` library is used for input validation on the backend. JSON Web Tokens (JWT) are utilized and stored in localStorage to maintain user sessions across site reloads. The frontend templating is done using EJS, and the site is deployed using Render's free services.

## Features

- User Authentication:
  - Register
  - Login
- Password hashing with `bcrypt`
- JWT for session management
- Input validation with `zod`
- Templating with EJS
- User and Book data storage in MongoDB
- Deployed on Render

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Contact](#contact)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ksaurav24/Library.git
    cd Library
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the application:**
    ```bash
    node index.js
    ```

## Usage

1. **Access the application:**
    Open your web browser and navigate to `http://localhost:3000`.

2. **Register:**
    - Navigate to the register page.
    - Fill in the required fields.
    - Submit the form to create a new user account.

3. **Login:**
    - Navigate to the login page.
    - Enter your credentials.
    - Submit the form to log in.

## Endpoints

- **GET** `/` - Home page
- **GET** `/register` - Register page
- **POST** `/register` - Handle user registration
- **GET** `/login` - Login page
- **POST** `/login` - Handle user login
- **GET** `/signout` - signout the user

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - bcrypt
  - zod
  - jsonwebtoken
- **Frontend:**
  - EJS (Embedded JavaScript)
  - HTML5
  - CSS
- **Deployment:**
  - Render

## Deployment

The application is deployed using Render's free services. You can access the live application at:

[Library Management Web App on Render](https://library-eufm.onrender.com)

## Contact

For any inquiries or issues, please contact:

- Saurav Kale
- Email: ksaurav4093@gmail.com

Feel free to contribute to this project by opening issues or submitting pull requests.
