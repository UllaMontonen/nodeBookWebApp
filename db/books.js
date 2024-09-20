const db = require('./dbconfig');

// Get all books
const getAllBooks = (req, res) => {
    db.query('SELECT * FROM books', (err, result) => {
        if (err)
            console.error(err);
        else
            res.json(result.rows)
    })
}

// Get a book by id
const getBookById = (req, res) => {
    const query = {
        text: 'SELECT * FROM books WHERE id = $1',
        values: [req.params.id],
    }
    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        else {
            if (result.rows.length > 0)
                res.json(result.rows);
            else
                res.status(404).end();
        }
    })
}

// Add new book
const addBook = (req, res) => {
    const newBook = req.body;
    const query = {
        text: 'INSERT INTO books (name, author, year) VALUES ($1, $2, $3)',
        values: [newBook.name, newBook.author, newBook.year],
      }
      db.query(query, (err, res) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
      })
    
      res.json(newBook);
}

// Delete book by id
const deleteBook = (req, res) => {
    const query = {
        text: 'DELETE FROM books WHERE id = $1',
        values: [req.params.id],
    }
    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })
    res.status(204).end();
}

// Delete all books (for tests)
const deleteAllBooks = () => {
    db.query('DELETE FROM books', (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })
}

// Edit book by id
const updateBook = (req, res) => {
    const editedBook = req.body;

    const query = {
        text: 'UPDATE books SET name=$1, author=$2, year=$3 WHERE id=$4',
        values: [editedBook.name, editedBook.author, editedBook.year, req.params.id],
    }
    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })
    res.json(editedBook);
}


module.exports = {
    getAllBooks: getAllBooks,
    getBookById: getBookById,
    addBook: addBook,
    deleteBook: deleteBook,
    updateBook: updateBook,
    deleteAllBooks: deleteAllBooks
}