-- Create the "bookstore" database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bookstore;

-- Switch to the "bookstore" database
USE bookstore;

-- Create the "books" table
CREATE TABLE IF NOT EXISTS books (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    subtitle TEXT,
    isbn13 BIGINT,
    price DECIMAL(10, 2),
    image_url VARCHAR(255),
    book_url VARCHAR(255)
);

-- Insert the provided data into the "books" table
INSERT INTO books (id, title, subtitle, isbn13, price, image_url, book_url)
VALUES
(1, 'Practical MongoDB', 'Architecting, Developing, and Administering MongoDB', 9781484206485, 32.04, 'https://itbook.store/img/books/9781484206485.png', 'https://itbook.store/books/9781484206485'),
(2, 'Learning C#', 'Architecting C#', 1001620983322, 0.00, 'https://itbook.store/img/books/1001620983322.png', 'https://itbook.store/books/1001620983322'),
(5, 'test', 'testsub', 79192, 3.50, 'placeholder.jpg', 'unknown'),
(6, 'Learning test', 'test2', 'test2', 6.90, 'test2', 'test2');
