# HomeHopper

![HomeHopper Logo](frontend/public/logo.png)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Welcome to HomeHopper, your go-to platform for finding and managing home rentals.

## Table of Contents 📑

- [Introduction](#introduction)
- [Features](#features)
- [Technologies-Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

HomeHopper is a web application that allows users to browse, create, and manage rental properties. It provides a seamless user experience for both property owners and renters.

## Features

- User Authentication 🔒
- Create, Read, Update, Delete Spots 🏠
- Responsive Design 📱
- Review and Rating System ⭐
- Search and Filter Listings 🔍
- Detailed Spot Information ℹ️
- User Profiles 👤

## Technologies Used

- React ⚛️
- Redux 🔄
- Express ⚡
- Sequelize 📊

## Setup

⚙️ To set up the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/HomeHopper.git

1. Install dependencies:

   ```sh
    npm install
   ```

1. Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=your_db_host
   JWT_SECRET=your_jwt_secret
   ```

1. Set up the database:

- Navigate to the backend directory:

   ```sh
   cd backend
   ```

- Create the database:

   ```sh
   npx sequelize-cli db:create
   ```

- Run migrations:

   ```sh
   npx sequelize-cli db:migrate
   ```

- Seed the database (optional):

   ```sh
   npx sequelize-cli db:seed:all
   ```

- Start the backend server:

   ```sh
   npm start
   ```

1. Start the frontend server:

- Navigate to the frontend directory:

    ```sh
    cd frontend
    ```

1. Start the frontend development server:

    ```sh
    npm run dev
    ```

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

🖥️ You can access the deployed application at [HomeHopper on Render](https://homehopper.onrender.com).

## Contributing

🤝 Contributions are welcome! Please fork the repository and create a pull request.

## License

📄 This project is licensed under the MIT License.
