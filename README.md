# rss-feed-reader

Basic client/server web app showing functionality for users creating / submitting trades, then displaying in an order book.

### Database
It's a good idea to get the db set up first.
* Uses MySQL
* Set up a MySQL instance on port 3306 (you can change this port, but will need to go into db.ts in the backend and reflect those changes)
* host: localhost
* name: root
* password: password
* port: 3306
* database: Create a schema titled 'order-book-db'
* Done. The typeorm package will seed the database appropriately for you when you start up the backend server

### Installing

* Make sure SQL and yarn are installed on your machine.
* Use node version 16.15.0
* Navigate to rss-feed-reader/frontend
  * For an all-in-one installation, run ``` npm run initialize ```
* Otherwise
  * ``` npm install ``` in this folder
  * ``` cd ../backend && yarn ```


## Authors

Jimmy Blundell  
jblundell123@gmail.com
