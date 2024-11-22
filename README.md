# boky-s_bookstore

A simple fullstack application which uses Node JS, Vue JS, and Express.js to bring you a lovely little emulation of itbooks.store/'s API.

Dependencies:
node,
mysql



Guide to running the app:

Upon installing MySQL and node (presuming a fresh GNU/Linux install)
Enter the MySQL REPL via:
mysql -u *username* -p *Enter*
*insert PW*
CREATE DATABASE bookstore;

Exit; (to leave the MySQL REPL)

mysql -u root -p bookstore < /path/to/bookstore.sql

clone the repo, 
inside of boky-s_bookstore/
run "npm run dev"
and
inside of boky-s_bookstore/bookApp
run "npm run dev"

Keep an eye on your terminal to see which port the frontend will be running on!

access via localhost:*port*

Todo: 

input validation

api scraper to populate with more books from itbooks (JSONtoDB function expansion)

more CRUD

Hosting on my VPS - working on it now!

and whatever comes to mind if I find the project fun enough :)
