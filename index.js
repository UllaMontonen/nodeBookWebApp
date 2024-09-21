const express = require('express');
const methodOverride = require('method-override');
const query = require('./db/books');
const bodyParser = require('body-parser');
const auth = require('./services/authenticate');
require('dotenv').config(); 

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const port = 3000;

const secretKey = process.env.SECRET_KEY;

app.set('view engine', 'pug');
app.set('views', './views');

// *** PUG VIEWS ***

app.get("/books", query.getAllBooksForRender);
app.delete("/books/:id", query.deleteBookForRender);

app.get("/books/new", (req, res) => {
    res.render('addbook', { title: 'Add a new Book' });
});

app.post("/books", (req, res) => {
    const newBook = req.body;
    query.addBookFromForm(req, res, newBook);
});

app.get("/books/:id/edit", (req, res) => {
    const bookId = req.params.id;
    query.getBookByIdForRender(req, res, bookId);
});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    query.updateBookForRender(req, res, bookId, updatedBook);
});


// *** API ENDPOINTS ***
app.get("/api/books", auth.authenticate, query.getAllBooks);
app.get("/api/books/:id", auth.authenticate, query.getBookById);
app.post("/api/books", auth.authenticate, query.addBook);
app.delete("/api/books/:id", auth.authenticate, query.deleteBook);
app.put("/api/books/:id", auth.authenticate, query.updateBook);
app.post("/login", auth.login);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

module.exports = app;