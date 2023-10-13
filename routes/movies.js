import express from 'express';

import moviesController from '../controllers/movies.js';

const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovie);
router.post('/', moviesController.postMovie);
router.put('/:id', moviesController.putMovie);
router.delete('/:id', moviesController.deleteMovie);

export default router;
