const express = require('express');
const query = require('./db/books');

const app = express();
app.use(express.json());

const port = 3000;

app.get("/api/books", query.getAllBooks);
app.get("/api/books/:id", query.getBookById);
app.post("/api/books", query.addBook);
app.delete("/api/books/:id", query.deleteBook);
app.put("/api/books/:id", query.updateBook);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});