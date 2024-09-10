import express from 'express';
import mysql from 'mysql2';
import routes from './routes/routes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

export const connection = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root',
    database: 'task_manager',
    password: '1234'
});

app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, () => {
        console.log('Listening at port 3000')
    });