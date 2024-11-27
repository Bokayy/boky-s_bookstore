# boky-s_bookstore

A simple fullstack application which uses Node JS, Vue JS, and Express.js to bring you a lovely little emulation of itbooks.store/'s API.

Dependencies:
node,
mysql



Guide to running the app:

Upon installing MySQL and node (presuming a fresh GNU/Linux install)
Enter the MySQL REPL via: </br>
mysql -u *username* -p *Enter* </br>
*insert PW* </br>
CREATE DATABASE bookstore; </br>
&nbsp;
Exit; (to leave the MySQL REPL) </br>
&nbsp;
mysql -u root -p bookstore < /path/to/bookstore.sql </br>

clone the repo, 
inside of boky-s_bookstore/
run "npm run dev" -> The port is set in app.js as port 2339
and
inside of boky-s_bookstore/bookApp
run "npm run dev" -> The port is set in bookApp\vite.config.js as 2337

access via localhost:*port* (Only the frontend)

Todo: 

input validation

api scraper to populate with more books from itbooks (JSONtoDB function expansion)

more CRUD

Hosting on my VPS - working on it now!

and whatever comes to mind if I find the project fun enough :)
