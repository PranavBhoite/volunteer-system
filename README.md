# Volunteer Management System

## 🚀 Overview
The `Volunteer Management System` project is a comprehensive volunteer management system designed to streamline the process of registering and managing volunteers. It includes a backend API, a frontend React app, and a PostgreSQL database. This project is ideal for organizations looking to efficiently manage their volunteer base.

## ✨ Features
- **Backend API**: RESTful API for managing volunteers, events, and user registrations.
- **Frontend React App**: User-friendly interface for volunteers to register and manage their participation.
- **PostgreSQL Database**: Reliable and scalable database for storing user data, events, and registrations.
- **Docker Compose**: Simplified deployment and management of the application stack.
- **Modern JavaScript**: Utilizes the latest JavaScript features and best practices.

## 🛠️ Tech Stack
- **Programming Language**: JavaScript
- **Frameworks and Libraries**:
  - **Backend**: Express.js, Sequelize (ORM)
  - **Frontend**: React, React Router, React Bootstrap
  - **Database**: PostgreSQL
  - **Build Tools**: Webpack, Babel
  - **Testing**: Jest, React Testing Library
- **System Requirements**: Node.js, Docker, PostgreSQL

## 📦 Installation

### Prerequisites
- Node.js (v14 or later)
- Docker
- PostgreSQL

### Quick Start
```bash
# Clone the repository
git clone https://github.com/PranavBhoite/volunteer-system.git

# Navigate to the project directory
cd volunteer-system

# Install dependencies
# Frontend
cd frontend
npm install

# Backend
cd server
npm install

# Start the backend server
node server.js
# Start the development server
npm start
```

### Alternative Installation Methods
- **Docker**: Use the provided `docker-compose.yml` file to set up the application stack.
  ```bash
  docker-compose up
  ```

### 🎯  Usage
- **Configuration**: Customize the application by modifying the environment variables in the `.env` file.
- **API Documentation**: Refer to the API documentation for more details on available endpoints and their usage.

## 📁 Project Structure
```
tmgf-test/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## 🔧 Configuration
- **Environment Variables**: Configure the application by setting environment variables in the `.env` file.
  ```env
  NODE_ENV=development
  DB_HOST=postgres
  DB_PORT=5432
  DB_NAME=volunteer_db
  DB_USER=postgres
  DB_PASSWORD=password
  PORT=5000
  ```

## 🤝 Contributing
- **How to Contribute**: Fork the repository and submit pull requests.
- **Development Setup**: Clone the repository and install dependencies.
  ```bash
  git clone https://github.com/PranavBhoite/volunteer-system.git
  ```
- **Pull Request Process**: Submit pull requests with clear descriptions.

## 👥 Maintainers
- TMGF Interns.

## 🐛 Issues & Support
- **Report Issues**: Create a new issue on the GitHub repository.
- **Get Help**: Join the project's community or contact the maintainers.