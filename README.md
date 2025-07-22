# Learning Management System (LMS)

This is a full-stack Learning Management System (LMS) built with the MERN stack (MongoDB, Express, React, Node.js). It provides a platform for instructors to create and manage courses and for students to enroll and watch video lectures. The application features role-based access control for administrators and regular users.

## ✨ Features

### For Users:
- **User Authentication**: Secure signup and login with JWT-based authentication.
- **Course Listing**: Browse all available courses.
- **Course Details**: View detailed descriptions of each course.
- **Enrollment**: (Placeholder for payment integration) Users can enroll in courses.
- **Video Lectures**: Watch course lectures with a video player.
- **Profile Management**: View and edit user profile information.
- **Contact Form**: Send messages or inquiries to the admin.

### For Admins:
- **Admin Dashboard**: A comprehensive dashboard with statistics on users and courses, visualized with charts.
- **Course Management (CRUD)**: Create, read, update, and delete courses.
- **Lecture Management (CRUD)**: Add, view, and delete lectures for each course.
- **Video Uploads**: Upload video lectures to Cloudinary.
- **User Statistics**: View total registered users and subscribed users.

## 🛠️ Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: For predictable state management.
- **React Router DOM**: For declarative routing.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: For making HTTP requests to the backend.
- **Chart.js**: For creating interactive charts in the admin dashboard.
- **React Hot Toast**: For user-friendly notifications.

### Backend
- **Node.js**: A JavaScript runtime environment.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM library for MongoDB and Node.js.
- **JSON Web Token (JWT)**: For secure user authentication.
- **Cloudinary**: For cloud-based image and video management.
- **Multer**: A middleware for handling `multipart/form-data`, used for file uploads.
- **Cors**: For enabling Cross-Origin Resource Sharing.
- **Bcrypt.js**: For hashing passwords.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or newer)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/HarshPatel0523/learning-management-system.git
    cd learning-management-system
    ```

2.  **Setup Backend:**
    - Navigate to the backend directory:
      ```bash
      cd lms-backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `lms-backend` root and add the following environment variables:
      ```env
      PORT=5001
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      JWT_EXPIRY=7d

      # Cloudinary Credentials
      CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret
      ```
    - Start the backend server:
      ```bash
      npm start
      ```

3.  **Setup Frontend:**
    - Navigate to the frontend directory from the root folder:
      ```bash
      cd lms-frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - The frontend is configured to proxy API requests to `http://localhost:5001`. No extra configuration is needed if the backend is running on that port.
    - Start the frontend development server:
      ```bash
      npm run dev
      ```

The application should now be running, with the frontend available at `http://localhost:5173` and the backend at `http://localhost:5001`.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to fix a bug, feel free to create an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
