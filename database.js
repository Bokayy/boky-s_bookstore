import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise() 

export async function getAllBooks(){
    const [rows] = await pool.query(`SELECT * FROM books`);
    return rows;
}
export async function getBookByExactTitle(title){
    const [rows] = await pool.query(
        `SELECT *
        FROM books
        WHERE title = ?
        LIMIT 1`,
        [title]);
    return rows[0]; // return the first object in the array;
}
export async function getBookByID(id){
    const [rows] = await pool.query(
        `SELECT *
        FROM books
        WHERE id = ?
        LIMIT 1`,
        [id]);
    return rows[0]; // return the first object in the array;
}
export async function getBookByISBN(id){
    const [rows] = await pool.query(
        `SELECT *
        FROM books
        WHERE id = ?
        LIMIT 1`,
        [id]);
    return rows[0]; // return the first object in the array;
}

export async function createBook(title,subtitle,isbn13,price,image,url){
    const [result] = await pool.query(`
    INSERT INTO
    books(title,subtitle,isbn13,price,image,url)
    VALUES(?,?,?,?,?,?)`,
    [title,subtitle,isbn13,price,image,url]
    );
    const id = result.insertId;
    const insertedBook = await getBookByID(id);
    console.log(insertedBook);
    return insertedBook; // return the inserted book for debugging purposes
}
export async function removeBook(id) {
    const [result] = await pool.query(`
      DELETE FROM
      books
      WHERE id = ?`,
      [id]
    );
    return result;
  }
//results matched by title
export async function searchBook(query){
    try {
        if (query === undefined) {
            //throw new Error('query undefined');
            return 0;
          }        
        console.log(query);
        const [result] = await pool.query(
        `
        SELECT * 
        FROM books 
        WHERE LOWER(title) LIKE 
        '%${query}%'
        OR LOWER(subtitle) LIKE 
        '%${query}%'`,
        [query.toLowerCase()]);
        return exhumeMetadata(result);
    }
    catch (error) {
        console.error('Error executing searchBook query:', error);
        //throw error;
      }
}
export function exhumeMetadata(pool_query){
    let total = (pool_query.length.toString()); 
    const page = "1" 
    let books = pool_query;  
    let return_value = {
        "total": total,
        "page": page,
        "books": books,
    }
    return return_value;
}
const testJsonObj=
{
    "title": "Microsoft ASP.NET and AJAX",
    "subtitle": "Architecting Web Applications",
    "isbn13": "9780735626218",
    "price": "$17.37",
    "image": "https://itbook.store/img/books/9780735626218.png",
    "url": "https://itbook.store/books/9780735626218"
};
//import JSON to Database
//todo: validation (is every field filled in and valid)
export async function JSONArraytoDB(jsonArray)
{   
    let insertionIDs = [];
    jsonArray = JSON.parse(jsonArray);
    //returns an array of arrays
    const values = jsonArray.map(jsonObj => [
        jsonObj["title"],
        jsonObj["subtitle"],
        jsonObj["isbn13"],
        jsonObj["price"].replace(/\$/g, ''), // Dollar sign removal
        jsonObj["image"],
        jsonObj["url"]
    ]);
    try {
        const [result] = await pool.query(
            `
            INSERT INTO
            books(title, subtitle, isbn13, price, image, url)
            VALUES ?`,
            [values]
        );
        insertionIDs = insertionIDs.concat(result.insertId);
        return insertionIDs;
    } catch(error) {
        console.error('Error executing JSONArraytoDB query:', error);
        throw error;
    }
};

export async function getBookByISBNMultiple(arrayOfISBNs){
    //console.log(arrayOfISBNs);
    try {
        const [result] = await pool.query(
        `
        SELECT id
        FROM books
        WHERE isbn13 IN (${arrayOfISBNs});`);
        console.log(result);
        return result;
    }
    catch (error) {
        console.error('Error executing getBookByISBNMultiple query:', error);
        throw error;
      }
}