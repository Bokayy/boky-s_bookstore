# boky-s_bookstore

A simple fullstack application which uses Node JS, Vue JS, and Express.js to bring you a lovely little emulation of itbooks.store/'s API.

Dependencies:
node,
mysql

Guide to running the app:
</br>
First, you have to clone the app and its submodule:
</br>
git clone --recurse-submodules https://github.com/Bokayy/boky-s_bookstore.git
</br>
Upon installing MySQL and node (presuming a fresh GNU/Linux install)
Enter the MySQL REPL via: </br>
mysql -u *username* -p *Enter* </br>
*insert PW* </br>
CREATE DATABASE bookstore; </br>
&nbsp;
Exit; (to leave the MySQL REPL) </br>
&nbsp;
mysql -u root -p bookstore < /path/to/bookstore.sql
</br>
&nbsp;
</br>
Database access credentials are accessed in database.js via an .env file which has to be created within the root directory. </br>
env file example:
>MYSQL_HOST='127.0.0.1' </br>
>MYSQL_USER='database_user' </br>
>MYSQL_PASSWORD='databasepassword' </br>
>MYSQL_DATABASE='bookstore' </br>
</br>
&nbsp;
</br>
Running the application (both the server and frontend): </br>
clone the repo, 
inside of boky-s_bookstore/
run "npm run dev" -> The port is set in app.js as port 2339
and
inside of boky-s_bookstore/bookApp
run "npm run dev" -> The port is set in bookApp\vite.config.js as 2337

access via localhost:*port* (Only the frontend)

Todo: 

Implement API Scraper (to download currently unavailable books) - code already exists
Implement pagination dots at the bottom of the screen
Search and Filter functions (to find the optimal way of balancing requests and saving data client side)
