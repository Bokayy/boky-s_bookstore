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

//console.log(await getAllBooks());

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

//console.log(await getBookByExactTitle("Practical MongoDB"));

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

//await createBook("Learning C#","","1001620983322","0.00","https://itbook.store/img/books/1001620983322.png","https://itbook.store/books/1001620983322");

console.log(await removeBook(3));