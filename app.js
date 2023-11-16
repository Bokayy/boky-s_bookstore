import express from 'express';
import fs from 'fs';
import path from 'path';
//used to store logs in a path
import * as url from 'url';
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//used to store logs in a path

import {
    getAllBooks,
    createBook,
    getBookByExactTitle,
    getBookByID,
    JSONtoDB,
    searchBook} 
from "./database.js";

const app = express();

app.use(express.json());

//CORS request error prevention
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:2337'); //the port the frontend is running on
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); //which http methods are allowed
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //headers (not sure)
    next();
  });

//get all books
app.get("/books", async (req, res) => {
    const allBooks = await getAllBooks();
    res.send(allBooks);
});

app.get("/books/search", async (req, res) => {
    const query = req.query.q;
    const books = await searchBook(query);
    res.send(books);
})

//get book by id
app.get("/books/:id(\\d+$)", async (req, res) => {
    const id = req.params.id;
    const book = await getBookByID(id);
    if (!book) {
        // If the book is not found,send a 404 (Not Found) response.
        return res.status(404).json({ error: "Book not found" });
    }
    res.send(book);
})
//create new book
app.post("/books", async (req, res) => {
    const {title,subtitle,isbn13,price,image,url} = req.body; //destructured the request
    const note = await createBook(title,subtitle,isbn13,price,image,url);
    res.status(201).send(note);
});

//get books from scraper
app.post("/insert", async (req,res) => {
    //give the log the name of the current date and time
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString().replace(/:/g, '-');
    const fileName = `${formattedDateTime}_postReqLog.txt`;
    //give the log the name of the current date and time
    const logsFolderPath = path.join(__dirname,'logs\\');

    //check if folder exists, if not, make it
    if (!fs.existsSync(logsFolderPath)) {
        fs.mkdirSync(logsFolderPath);
      }
    //check if folder exists, if not, make it
    console.log(JSON.stringify(req.body));
    let fileContent = JSON.stringify(req.body);

    fs.writeFile(`${logsFolderPath}${fileName}`, fileContent, (err)=> {
        if (err) {
            console.error('Error creating the file:', err);
        } else {
            console.log("text file created successfully");
        }
    })
    res.status(200).send("backend: success");
});

//init server, entrypoint
app.listen(2339, ()=> {
    console.log('Server is running on port 2339');
})

//automatic async error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send( 'Something broke!')
})