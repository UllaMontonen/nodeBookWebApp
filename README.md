# Node project with REST
This project was created using the knowledge gained from the Metropolia NodeJS course. It is a basic web application where users can retrieve a list of books, add new books, and edit or delete existing ones.

## Operating environment
- Node.js 22.8.0

## Dependencies
- Express 4.21
- PostgreSQL 8.13.0
- Dotenv 16.4.5
- Pug 3.0.3
- Method-override  3.0.0
- Jsonwebtoken 9.0.2
- Bcrypt 5.1.1

## User Interface
The user interface is built using **Pug** as the templating engine and **Bootstrap** for styling. Pug allows for clean and readable HTML generation, while Bootstrap provides responsive design elements for a better user experience.

![book list view](/pictures/booklist.png)
![add book view](/pictures/addBook.png)


## Database
### Books:
- **id:** autogenerated - VARCHAR - PK
- **name:** name of the book - VARCHAR(200) - Not null
- **author:** name of the author - VARCHAR(200) - Not null
- **year:** year of publication - INTEGER - Not null

### Users:
- **id:** autogenerated - SERIAL - PK
- **email/username:** VARCHAR(255) - Not null, unique
- **password:** TEXT - Not null

## API Endpoints
- **GET /api/books:** retrieve the list of books
- **GET /api/books/:id:** retrieve a book by its id
- **POST /api/books:** add a new book (the request body should contain JSON without an id)
- **DELETE /api/books/:id:** delete a book by its id
- **PUT /api/books/:id:** edit an existing book (the request body should contain JSON without an id)
- **POST /login** send user credentials and receive a token

## Authentication
JSON Web Token (JWT) is used to protect the data. You can read more about it at https://jwt.io/

Authentication has been implemented only for API endpoints, not for the user interface.

## Testing
The project uses Mocha, Chai, and Chai HTTP libraries for testing. You can run the tests with the following command: `npm test`.

### Created Tests
- Add a new book: Tests the API's ability to add a book to the database.
- Get books: Tests the API's functionality to retrieve the list of books.

## Installation iInstructions
1. **Download Node.js:** Install Node.js if you haven't already done so.
2. **Install an Editor:** Use VS Code or any other code editor of your choice.
3. **Clone the Project:** Clone this repository to your local machine using: `git clone https://github.com/UllaMontonen/nodeBookWebApp.git`
4. **Navigate to the Project Directory:** Once cloned, open the project folder using your editor
5. **Install Dependencies:** Run the following command to install all required dependencies: `npm install`
6. **Run the Project:** Start the project using the development command: `npm run dev`


### Database
PostgreSQL is used as the database. For more information, visit: https://www.postgresql.org/download/ 

#### To set up the books database using SQL Shell (psql):

- If you are using macOS, open SQL Shell with the following command: `psql postgres`. 
- Create the database with: `CREATE DATABASE book;`. 
- Connect to the book database using: `\c book`. 
- Create the books table with the following SQL command:
```
CREATE TABLE books (
    id serial PRIMARY KEY,
    name VARCHAR (200) NOT NULL,
    author VARCHAR (200) NOT NULL,
    year INTEGER NOT NULL 
);
```
- Verify the table creation with: `\d` 
- To check the contents of the books table: `SELECT * from books;`
- To insert data into the books table, use:
```
INSERT INTO books (name, author, year)
Values ("Book name", "Author name", 2024);
```
- Verify the inserted data with: `SELECT * from books;`

### Setting Up the User Database for JSON Web Token
- Navigate to the `book`database (`\c book` in SQL Shell) and execute the following command:
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL
);
```
- You can use either an email or a username.
- To insert data into the users table, use:
```
INSERT INTO users 
    (email, password) 
VALUES 
    ('email@email.com', 'hashedpassword' );
```

## Further Development
Creating login and signup functionality for the user interface.