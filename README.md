---
# Addis Ababa City Public Transport App

This application is designed to streamline and enhance the public transportation experience in Addis Ababa. Built with a modern tech stack, it provides users with real-time information and convenient features for navigating the city's public transit system.

## Features

- **Real-Time Updates**: Get live updates on bus schedules and routes.
- **Route Planning**: Plan your journey with ease by accessing detailed route information.
- **User Profile**: Manage your personal information and preferences.
- **Transportation History**: View your previous transportation history.
- **Latest News**: Stay updated with the latest news related to public transport.
- **Feedback Page**: Provide feedback to help improve the app and services.
- **Contact Us Page**: Reach out for support or inquiries.
- **User-Friendly Interface**: Enjoy a clean and intuitive interface designed with Tailwind CSS.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## User and Admin Features

### User Side
- **Profile Management**: Users can update their personal information and preferences.
- **Transportation History**: Users can view their previous transportation records.
- **Latest News**: Users can access the latest news related to public transportation.
- **Feedback**: Users can submit feedback to help improve the service.
- **Contact Us**: Users can reach out for support or inquiries.

### Admin Side
- **User Management**: Admins can manage user accounts and profiles.
- **Feedback Management**: Admins can review and respond to user feedback.
- **Route and Schedule Management**: Admins can update and add new bus routes and schedules.
- **News Updates**: Admins can post the latest news and updates for users.
- **Summary Dashboard**: Admins can view an overall summary of the total number of users, transactions, and routes.

<div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
  <img src="https://github.com/teklumt/Addis-Transport-web-app/assets/135549662/77946759-2b66-43d2-ba44-e53eac5f5506" alt="React" style="max-width: 30%; height: auto; margin: 10px;">
  <img src="https://github.com/teklumt/Addis-Transport-web-app/assets/135549662/dd976cce-b909-42b4-90b4-bafa13d22ba7" alt="Spring Boot" style="max-width: 30%; height: auto; margin: 10px;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/teklumt/Addis-Transport-web-app/assets/135549662/5c018a8e-39d1-48f5-8bf0-206716a465c6" alt="MySQL" style="max-width: 30%; height: auto; margin: 10px;">
</div>

## Tech Stack
- **Frontend**: Developed using React for a dynamic and responsive user experience.
  - **Routing**: Implemented with React Router DOM for seamless navigation.
  - **Form Handling**: Managed with React Form for efficient form handling.
- **Backend**: Powered by Java Spring Boot for robust and efficient server-side operations.
  - **API Endpoints**:
    - `/user`: User profile management
    - `/history`: User transportation history
    - `/feedback`: User feedback
    - `/bus`: Bus schedules and routes
- **Database**: Utilizes MySQL for reliable data storage and retrieval.
- **Styling**: Styled with Tailwind CSS to ensure a modern and cohesive look and feel.

## Requirements

- **Node.js**: Version 20.10.0 or above
- **JDK**: Version 17 or above
- **MySQL**: Ensure MySQL server is installed and running

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Addis-ababa-transport-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd addis-ababa-transport-app
   ```
3. Install frontend dependencies:
   ```sh
   cd Frontend
   npm install
   ```
4. Start the frontend server:
   ```sh
   npm run dev
   ```
5. Install backend dependencies:
   ```sh
   cd ../Transport
   ./mvnw install
   ```
6. Set up the MySQL database:
   - Create a new database named `transport_demo`:
     ```sql
     CREATE DATABASE transport_demo;
     ```
   - Update the database configuration in the backend application properties.
7. Start the backend server:
   ```sh
   ./mvnw spring-boot:run
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

Developed by Teklu Moges.

---
