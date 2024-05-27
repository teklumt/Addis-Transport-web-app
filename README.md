# Addis Ababa City Public Transport App (V 0.1)

This application is designed to streamline and enhance the public transportation experience in Addis Ababa. Built with a modern tech stack, it provides users with real-time information and convenient features for navigating the city's public transit system.

## Features

- **Real-Time Updates**: Get live updates on bus schedules and routes.
- **Route Planning**: Plan your journey with ease by accessing detailed route information.
- **User Profile**: Manage your personal information and preferences.
- **Transportation History**: View your previous transportation history.
- **Latest News**: Stay updated with the latest news related to public transport.
- **Feedback Page**: Provide feedback to help improve the app and services.
- **User-Friendly Interface**: Enjoy a clean and intuitive interface designed with Tailwind CSS.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## User and Admin Features

### User Side
- **Profile Management**: Users can update their personal information and preferences.
- **Transportation History**: Users can view their previous transportation records.
- **Latest News**: Users can access the latest news related to public transportation.
- **Feedback**: Users can submit feedback to help improve the service.

### Admin Side
- **User Management**: Admins can manage user accounts and profiles.
- **Feedback Management**: Admins can review and respond to user feedback.
- **Route and Schedule Management**: Admins can update bus routes and schedules.
- **News Updates**: Admins can post the latest news and updates for users.

## Tech Stack
![spring](https://github.com/teklumt/Addis-Transport-web-app/assets/135549662/f78346d7-7a06-48e2-afe4-b19b7879926b)

- **Frontend**: Developed using React for a dynamic and responsive user experience.
  - **Routing**: Implemented with React Router DOM for seamless navigation.
- **Backend**: Powered by Java Spring Boot for robust and efficient server-side operations.
  - **API Endpoints**:
    - `/user`: User profile management
    - `/history`: User transportation history
    - `/feedback`: User feedback
    - `/bus`: Bus schedules and routes
- **Styling**: Styled with Tailwind CSS to ensure a modern and cohesive look and feel.

## Requirements

- **Node.js**: Version 20.10.0 or above
- **JDK**: Version 17 or above

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/addis-ababa-transport-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd addis-ababa-transport-app
   ```
3. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```
4. Start the frontend server:
   ```sh
   npm run dev
   ```
5. Install backend dependencies and start the server:
   ```sh
   cd ../Transport
   ./mvnw spring-boot:run
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

---
