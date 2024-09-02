import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module using URL parsing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Create a new instance of pg.Client and connect to the PostgreSQL database
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Sites',
    password: 'singh@123!',
    port: '5432'
});

// Serve the 'home.html' file when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html pages/home.html'));
});

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
