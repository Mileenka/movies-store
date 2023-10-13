import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

import moviesRoutes from './routes/movies.js';

dotenv.config();

const PORT = process.env.PORT || 3005;

const __fileName = fileURLToPath(import.meta.url);
const PATH = dirname(__fileName);

const app = express();
// set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static folder
app.use(express.static(path.join(PATH, 'public')));
app.use('/api/movies', moviesRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        message: `Oh no! These movies seem to have gone on an intergalactic adventure and couldn't be found in this universe. Please check your coordinates and try again!`
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
