# HomeHopper

Welcome to HomeHopper! This is a web application for managing vacation rentals.

## Live Demo

Check out the live demo of the application deployed on Render: [HomeHopper Live Demo](https://homehopper.onrender.com)

## Features

- User authentication and authorization
- Manage vacation rental spots
- Create, update, and delete spots
- View and post reviews for spots

## Getting Started

To get started with the project locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- PostgreSQL database

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/HomeHopper.git
    cd HomeHopper
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    DB_HOST=your_db_host
    JWT_SECRET=your_jwt_secret
    ```

4. Set up the database:

    ```sh
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

5. Start the development server:

    ```sh
    npm start
    ```

## Usage

After starting the development server, you can access the application at `http://localhost:3000`.

For the live demo, you can visit [HomeHopper Live Demo](https://homehopper.onrender.com).

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.

## License

This project is licensed under the MIT License.
