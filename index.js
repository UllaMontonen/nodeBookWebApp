const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;

let books = [
    { id: '1', name: 'Harry Potter ja Feeniksin kilta', author: 'J.K. Rowling', year: 2018 },
    { id: '2', name: 'Sinuhe egyptiläinen', author: 'Mika Waltari', year: 2020 },
    { id: '3', name: 'Kirjan nimi', author: 'Kirjailija', year: 2000 }
];

// Get all books
app.get("/api/books", (req, res) => {
    res.json(books);
})

// Get a certain book
app.get("/api/books/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books.filter(book => book.id === bookId);
    if (book.length > 0)
        res.json(book);
    else
        res.status(404).end();
})

// Add a new book
app.post("/api/books", (req, res) => {
    const newBook = {'id': Date.now().toString(), ...req.body};
    books = [...books, newBook];

    res.json(newBook);
});

// Delete a book
app.delete("/api/books/:id", (req, res) => {
    const id = req.params.id;

    books = books.filter(book => book.id !== id);
    res.status(204).end();
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});