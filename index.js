const pg = require('pg');
const client = new pg.Client('postgres://localhost/fullstack_template_movies_db');
const express = require('express');
const app = express();
const path = require('path');

const homePage = path.join(__dirname, 'index.html');
app.get('/', (req, res)=> res.sendFile(homePage));

const reactApp = path.join(__dirname, 'dist/main.js');
app.get('/dist/main.js', (req, res)=> res.sendFile(reactApp));

const reactSourceMap = path.join(__dirname, 'dist/main.js.map');
app.get('/dist/main.js.map', (req, res)=> res.sendFile(reactSourceMap));

const styleSheet = path.join(__dirname, 'styles.css');
app.get('/styles.css', (req, res)=> res.sendFile(styleSheet));

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  const SQL = `
    DROP TABLE IF EXISTS movies;
    CREATE TABLE movies(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      stars INT
    );
    INSERT INTO movies (title, stars) VALUES ('Inception', 5);
    INSERT INTO movies (title, stars) VALUES ('The Shawshank Redemption', 5);
    INSERT INTO movies (title, stars) VALUES ('The Dark Knight', 5);
    INSERT INTO movies (title, stars) VALUES ('Forrest Gump', 4):
    INSERT INTO movies (title, stars) VALUES ('Pulp Fiction', 4);
    INSERT INTO movies (title, stars) VALUES ('The Lord of the Rings: The Return of the King', 5);
    INSERT INTO movies (title, stars) VALUES ('The Godfather', 5);
    INSERT INTO movies (title, stars) VALUES ('The Matrix', 4);
    INSERT INTO movies (title, stars) VALUES ('The Avengers', 4);
    INSERT INTO movies (title, stars) VALUES ('Titanic', 4);
  `;
  await client.query(SQL);
  console.log('create your tables and seed data');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
};

init();
