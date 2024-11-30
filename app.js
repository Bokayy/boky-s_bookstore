import express from 'express';
import fs from 'fs';
import path from 'path';
//used to store logs in a path
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); //used to store logs in a path
let insertReq = '';

import {
    getAllBooks,
    createBook,
    getBookByExactTitle,
    getBookByID,
    JSONArraytoDB,
    searchBook} 
from "./database.js";

import { inputValidation } from "./scraper_endpoint.js";

//todo: a function that sends console logs to the frontend Logger
//barebones module pattern
//preferring object composition over ES6 function for learning
//setter explicity called in each getter or setter i'm using
const frontLog = (() => {
        //closure; function to wrap the data so it stays permanent
        //return an object seeing as frontLog is an object

        //private members
        let buffer = new String();
        //public members
        return {
            setLogger: (newLog) => {
                buffer = newLog;
            }
        };

    });

const app = express();

app.use(express.json());

//CORS request error prevention
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:2337'); //the port the frontend is running on
    res.header('Access-Control-Allow-Origin', 'http://0.0.0.0:2337'); //Whatever address the FE is running on
    res.header('Access-Control-Allow-Origin', 'https://0.0.0.0:2053'); //Backend port
    res.header('Access-Control-Allow-Origin', 'https://boris-milojevic.from.hr:2053'); //Backend port
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
    //return an object containing the page and query parameters
    const queryObject = {
        query: req.query.q,
        page : req.query.q2
    } 
    const books = await searchBook(queryObject);
    if(books === 0){return res.status(404).json({ error: "Book not found" });
    }
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
    const book = await createBook(title,subtitle,isbn13,price,image,url);
    res.status(201).send(book);
});

function createLog(fileContent){
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

    fs.writeFile(`${logsFolderPath}${fileName}`, fileContent, (err)=> {
        if (err) {
            console.error('Error creating the file:', err);
        } else {
            console.log("text file created successfully");
        }
    })
}

//get books from scraper
app.post("/insert", async (req,res) => {
    const stringified = JSON.stringify(req.body);
    createLog(stringified);
    let numberOfBooks = await inputValidation(stringified);
    if (numberOfBooks !== 0) {
        let result = await JSONArraytoDB(stringified)
        res.status(200).send(`added item id's:${result}`);    
    }
    else {
        res.status(500).send("Input data invalid, check backend console log");
    }
});

//init server, entrypoint
app.listen(2053, '0.0.0.0', ()=> {
    console.log('Server is running on port 2053');
})

//automatic async error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send( 'Something broke!')
})