# PassGuard

PassGuard is a secure password manager designed to keep your sensitive information safe and easily accessible. Built with React for the frontend and Express.js for the backend, PassGuard offers a user-friendly interface for managing your passwords.

## Features

- **Secure Storage:** Your passwords are securely stored using MongoDB, ensuring they remain encrypted and protected from unauthorized access.
- **User-Friendly Interface:** PassGuard provides an intuitive interface for adding, editing, and deleting passwords, making it easy to manage your credentials.
- **Password Generation:** Generate strong, randomized passwords with the click of a button to enhance the security of your accounts.
- **Clipboard Integration:** Quickly copy passwords to your clipboard with the built-in copy-to-clipboard functionality, ensuring seamless login experiences.
- **Responsive Design:** PassGuard is responsive and works seamlessly across various devices, allowing you to access your passwords anytime, anywhere.

## Technologies Used

- **Frontend:** React, react-toastify
- **Backend:** Express.js, MongoDB
- **Other:** uuid for generating unique identifiers, dotenv for environment variables, bodyParser for parsing request bodies, cors for enabling cross-origin resource sharing

## Getting Started

To run PassGuard locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Set up your MongoDB database and configure your environment variables in a `.env` file.
4. Start the backend server by running `npm run server`.
5. Start the frontend development server by running `npm start`.
6. Access PassGuard in your browser at `http://localhost:3000`.

## Contribution

Contributions to PassGuard are welcome! Whether you're fixing a bug, implementing a new feature, or improving the documentation, feel free to submit a pull request.
