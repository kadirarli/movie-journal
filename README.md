# Movie Journal - Film and TV Show Watchlist

This project is aimed at developing an application that allows users to record, comment on, and track the movies and TV shows they have watched.

## Features

- Add, list, update, and delete movies and TV shows.
- MongoDB database connection.
- RESTful API endpoints.
- Tests using Jest and Supertest.
- Integrated TMDB API for movie search and details fetching.

## Getting Started

To get started with this project, follow the steps below:

### 1. Clone the Repository

```bash
git clone https://github.com/kadirarli/movie-journal.git
cd movie-journal
```

### 2. Install Dependencies
Install the dependencies used in the project by running:

```bash
npm install
```

### 3. Set Up Environment Variables
Create a .env file in the root directory of the project and add the following variables:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/movie-journal
TMDB_API_KEY=your_tmdb_api_key_here
JWT_SECRET=your_jwt_secret_key_here
```
- **PORT**: Specifies the port the application will run on.
- **MONGO_URI**: The URI used to connect to the MongoDB database.
- **TMDB_API_KEY**: The TMDb (The Movie Database) API key, required for external API integration.
  - TMDb API Integration:
  - By integrating the TMDb API, we can allow users to easily add movie information. For example, a user can simply enter a movie title, and we can fetch the relevant information from TMDb and save it.
  - Register for an API key on TMDb:
    - Visit TMDb's official website: https://www.themoviedb.org/
    - Create an account and log in.
    - Go to the "API" section and obtain an API key.
  - Don't forget to add the API key to your .env file.
- **JWT_SECRET**: Used to sign and verify JWT tokens for secure authentication and authorization. Keep this key private and do not share it publicly.

### 4. Start the Application
To start the application, run the following command:

```bash
npm run start
```

This will start the Express application and connect to the MongoDB database.

The app will be available at http://localhost:3000.

## Running Tests
Tests have been written using Jest and Supertest. To run the tests, use the following command:

```bash
npm test
```

Jest will display the results of the tests in the terminal to check if everything is functioning as expected.

## Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Make your changes.
3. Submit a pull request.

Any contributions are appreciated and will help make the project better. Thank you!

## License
This project is licensed under the MIT License.