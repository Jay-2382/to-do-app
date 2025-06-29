# Task Manager with Email OTP Authentication (MERN Stack)

Task Manager App with Email OTP Authentication (MERN Stack)
A secure task management web app built using the MERN stack. It features email OTP verification during user registration, JWT-based authentication, protected routes, and task CRUD operations. The frontend uses React with Tailwind CSS and modals for a smooth user experience.



[![This is the preview of this project]](https://youtu.be/QdrCJ6PIXLc?si=kitNohTUxnIP8UxJ)


  # about

This is a full-stack Task Management App built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with a focus on secure user authentication using Email-based OTP verification during registration. Users can register, verify their email through a one-time password (OTP), log in, and manage their tasks with an intuitive UI.

 Key Features: 
    1. Email OTP-Based Registration
      New users must verify their email via OTP before completing registration.

    2. JWT Authentication
      Login credentials are securely handled using JWT, and the token is stored in localStorage.

    3. User Login & Logout
      Authenticated users can log in and log out with token-based session persistence.
    
    4. Reset password
        User can reset their forget password

    4. Protected Routes
      Access to the dashboard and task management routes is restricted to authenticated users.

### Task Management Dashboard 

    -Create, Read, Update, Delete (CRUD) tasks

    -Add a task title, description, and status

    -Filter and search tasks

### Responsive Frontend UI Styled using Tailwind CSS. 

### Clean layout with dynamic Navbar and modals.

     React Routing

     Public: Login, Register

     Private: Dashboard, Create Task

     Shows Login/Register when logged out

    Shows Dashboard/Create Task/Logout when logged in

# API ENDPOINTS



  ##  Authentication API

  ### POST `/api/auth/register`  

        -Register a user and send OTP to email.

  ### GET `/api/auth/me`  

        -Get current logged-in user's info (requires token).

  ### POST `/api/auth/verify-otp`  
      
        -Verify OTP and complete registration.

   ### POST `/api/auth/login`  
      
      -Log in with email and password.

  ### POST `/api/auth/logout`  
      
      -Log out the user.



##  Tasks API (Protected – Requires Bearer Token)

### GET `/api/tasks` 

      -Get all tasks for the logged-in user.

### GET `/api/tasks/:id`  

      -Get a specific task by ID.

### POST `/api/tasks`

      -Create a new task.

### PUT `/api/tasks/:id`

      -Update a specific task.

### DELETE `/api/tasks/:id`  
      -Delete a specific task.




##  Forgot Password API

  ### POST `/api/auth/forgot-password`

        - Sends OTP to user’s email for password reset.

  ### POST `/api/auth/reset-password`
          Resets the password using valid OTP.

# Installation & Setup

   ## Backend (Node.js + Express)

      1. Navigate to backend folder

          `cd backend`

      2. install dependencies 

          `npm install`

      3. Configure environment variables

          Create a .env file in the backend folder with the following:

             `MONGO_URI=your_mongodb_connection_string`
             `JWT_SECRET=your_jwt_secret_key`
             `EMAIL_USER=your_email_address`
             `EMAIL_PASS=your_email_password_or_app_password`

4. Start the server

        `npm run dev`

# Frontend (React + Vite + Tailwind CSS)

  1. Navigate to frontend folder

        `cd frontend`

  2. Install dependencies

        `npm install`

  3. Start the development server

        `npm run dev`



# Features

      1. Registration with Email OTP

        - Click on the Sign Up button from the homepage.

        - Enter your Name, Email, and Password.

        - An OTP will be sent to your email.

        - Enter the OTP to complete the registration.

        - You will be redirected to the Login modal.

      2. Login

        - Enter your registered email and password.

        - On successful login, you will be redirected to the Dashboard.

        - Session info is stored securely in localStorage.

      3. Task Management (Dashboard)

        - Create new tasks using the "Create Task" modal.

        - Each task supports a Title, Description, and Status.

        - Tasks can be edited, deleted, and filtered.

        - Protected routes ensure only logged-in users can access the Dashboard.

      4. Logout

        -  Use the Logout button in the Navbar to securely log out.

        - Your session will be cleared and you’ll return to the homepage.


## License
    This project is licensed under the MIT [License](./LICENSE)

## Contact

For any queries, suggestions, or collaboration requests, feel free to reach out:

- **Name:** Jay Kumar
- **Email:** jayk2382@gmail.com

