import express from 'express';

import {
    getAllBooks,
    createBook,
    getBookByExactTitle,
    getBookByID,
    JSONtoDB} 
from "./database.js";

const app = express();

app.use(express.json());

//get all books
app.get("/books", async (req, res) => {
    const allBooks = await getAllBooks();
    res.send(allBooks);
});

//get book by id
app.get("/books/:id", async (req, res) => {
    const id = req.params.id;
    const note = await getBookByID(id);
    if (!note) {
        // If the note is not found,send a 404 (Not Found) response.
        return res.status(404).json({ error: "Book not found" });
    }
    res.send(note);
})
//create new book
app.post("/books", async (req, res) => {
    const {title,subtitle,isbn13,price,image,url} = req.body; //destructured the request
    const note = await createBook(title,subtitle,isbn13,price,image,url);
    res.status(201).send(note);
})

//automatic async error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send( 'Something broke!')
})

//init server
app.listen(8080, ()=> {
    console.log('Server is running on port 8080')
})