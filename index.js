const express = require('express');
const methodOverride = require('method-override');
const query = require('./db/books');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const port = 3000;

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
app.get("/api/books", query.getAllBooks);
app.get("/api/books/:id", query.getBookById);
app.post("/api/books", query.addBook);
app.delete("/api/books/:id", query.deleteBook);
app.put("/api/books/:id", query.updateBook);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

module.exports = app;