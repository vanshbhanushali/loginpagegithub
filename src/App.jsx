import React, { useState } from 'react';
// import './App.css'; // This import is removed to fix the error in this environment.

/**
 * This component injects the CSS styles directly into the document.
 * This fixes the error because a separate .css file cannot be imported here.
 */
const AppStyles = () => (
  <style>
    {`
/* Global styles */
body {
  margin: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

/* Main authentication container */
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6; /* bg-gray-100 */
}

/* Form card wrapper */
.form-wrapper {
  width: 100%;
  max-width: 28rem; /* max-w-md */
  padding: 2rem; /* p-8 */
  background-color: #ffffff; /* bg-white */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
}

/* Form title */
.form-title {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700; /* font-bold */
  text-align: center;
  color: #111827; /* text-gray-900 */
  margin: 0 0 2rem 0;
}

/* Form element */
.form-body {
  margin-top: 2rem; /* mt-8 */
}

.form-body > div:not(:last-child) {
  margin-bottom: 1.5rem; /* space-y-6 */
}

/* Input labels */
.input-label {
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
}

/* Input fields */
.input-field {
  width: 100%;
  margin-top: 0.25rem; /* mt-1 */
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
  border: 1px solid #d1d5db; /* border border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  appearance: none;
  font-size: 0.875rem; /* sm:text-sm */
}

.input-field::placeholder {
  color: #9ca3af; /* placeholder-gray-400 */
}

.input-field:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);
}

/* Message display */
.message {
  font-size: 0.875rem; /* text-sm */
  text-align: center;
  font-weight: 500; /* font-medium */
  margin-bottom: 1.5rem; 
}

.message-success {
  color: #16a34a; /* text-green-600 */
}

.message-error {
  color: #dc2626; /* text-red-600 */
}

/* Submit button */
.submit-button {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1rem; /* px-4 py-3 */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #ffffff; /* text-white */
  background-color: #000000;
  border: 1px solid transparent;
  border-radius: 0.375rem; /* rounded-md */
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #333333; /* Darker black for hover */
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(0, 0, 0, 0.5) inset;
}

/* Toggle link container */
.toggle-form-container {
  font-size: 0.875rem; /* text-sm */
  text-align: center;
  margin-top: 2rem;
}

/* Toggle link */
.toggle-form-link {
  font-weight: 500; /* font-medium */
  color: #000000;
  cursor: pointer;
}

.toggle-form-link:hover {
  color: #333333; /* Darker black for hover */
  text-decoration: underline;
}
    `}
  </style>
);


/**
 * Main App component featuring a toggleable Login and Sign Up form.
 */
export default function App() {
  // State to toggle between 'login' and 'signup' modes
  const [isLogin, setIsLogin] = useState(true);

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for displaying messages to the user (e.g., errors, success)
  const [message, setMessage] = useState('');

  // Simulate a user database. Pre-populate with one user.
  const [users, setUsers] = useState([
    { email: "test@example.com", password: "password123" }
  ]);

  /**
   * Handles form submission for both login and signup.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (password.length < 6 && !isLogin) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    // Clear any previous messages
    setMessage('');

    if (isLogin) {
      // --- LOGIN LOGIC ---
      // This is where you would make an API call to your backend
      console.log('Attempting login with:', { email, password });

      // Find a user that matches both email and password
      const userFound = users.find(
        (user) => user.email === email && user.password === password
      );

      if (userFound) {
        // Simulate a successful login
        setMessage('Login successful! Welcome back.');
        // Clear form
        setEmail('');
        setPassword('');
      } else {
        // Simulate a failed login
        setMessage('Invalid email or password.');
      }

    } else {
      // --- SIGNUP LOGIC ---
      // This is where you would make an API call to your backend
      console.log('Attempting signup with:', { email, password });

      // Check if user already exists
      const userExists = users.find((user) => user.email === email);

      if (userExists) {
        setMessage('Email already in use. Please log in or use a different email.');
      } else {
        // Add new user to our simulated database
        setUsers([...users, { email, password }]);

        // Simulate a successful signup
        setMessage('Sign up successful! Please log in.');
        // Switch to login view
        setIsLogin(true);
        // Clear form
        setEmail('');
        setPassword('');
      }
    }
  };

  /**
   * Toggles the form between login and signup modes.
   */
  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear fields and messages when toggling
    setEmail('');
    setPassword('');
    setMessage('');
  };

  return (
    // Full-screen container, centers the form
    <div className="auth-container">
      {/* This adds the styles to the page.
        In your local project, you can keep your App.css file 
        and the `import './App.css'` line instead of this.
      */}
      <AppStyles />

      <div className="form-wrapper">

        {/* Header */}
        <h2 className="form-title">
          {isLogin ? 'Welcome Back!' : 'Create Your Account'}
        </h2>

        {/* Form */}
        <form className="form-body" onSubmit={handleSubmit}>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="input-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder={isLogin ? "Your Password" : "At least 6 characters"}
            />
          </div>

          {/* Message Display */}
          {message && (
            <p className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
              {message}
            </p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="submit-button"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Toggle Form Link */}
        <div className="toggle-form-container">
          <span
            onClick={toggleForm}
            className="toggle-form-link"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Log in'}
          </span>
        </div>
      </div>
    </div>
  );
}

