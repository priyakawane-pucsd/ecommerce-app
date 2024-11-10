# User-Product Management System

This Node.js-based system provides a management platform with distinct **Admin** and **User** roles. It enables **user registration**, **product listing**, and **admin controls** over user and product data.

## Features

- **User Account**: Signup and Sign In functionality for users.
- **Admin Account**: Only one admin who manages users and products.
- **Product Management**: Users can add products, and the admin decides which are displayed.
- **User Management**: The admin can update or delete users.
- **Product Approval**: Admins can approve products for display, and manage update/delete operations on products.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup environment variables**:

   Create a `.env` file with the following:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your_db_name
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server**:

   ```bash
   node server.js
   ```

---

## Authorization

- Admin access required for managing users and approving/disapproving products.
- JWT token required for protected routes. Include as `Bearer <token>` in the Authorization header.

## Running the Project

1. Start the server using `node server.js`.
2. Use swagger to test the API endpoints. http://localhost:5001/api-docs/#/
3. Access token generation upon login; include it in the Authorization header for routes that require authentication.

---

## Notes

- Ensure MongoDB is running if using MongoDB.
- This setup assumes MongoDB as the database. For MySQL, adjust models and configurations accordingly.
- Only one admin account is allowed, created by specifying `"role": "admin"` during signup.