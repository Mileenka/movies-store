let movies = [
    {
        id: 1,
        title: 'Pirates of the Caribbean',
        releaseYear: 2006,
        director: 'Gore Verbinski',
        src: 'https://m.media-amazon.com/images/I/81uG5LWMGfL.jpg'
    },
    {
        id: 2,
        title: 'Inception',
        releaseYear: 2010,
        director: 'Christopher Nolan',
        src: 'https://filmartgallery.com/cdn/shop/files/Inception-Vintage-Movie-Poster-Original-1-Sheet-27x41.jpg?v=1691730160'
    },
    {
        id: 3,
        title: 'The Matrix',
        releaseYear: 1999,
        director: 'Lana and Lilly Wachowski',
        src: 'https://cdn.europosters.eu/image/1300/art-photo/matrix-choose-your-path-i153524.jpg'
    },
    {
        id: 4,
        title: 'The Green Mile',
        releaseYear: 1999,
        director: 'Frank Darabont',
        src: 'https://www.themoviedb.org/t/p/original/364bqbMaA2ablByrmN6pETrTVzf.jpg'
    },
    {
        id: 5,
        title: 'Avengers: Endgame',
        releaseYear: 2019,
        director: 'Anthony and Joe Russo',
        src: 'https://i.etsystatic.com/13367669/r/il/db21fd/2198543930/il_570xN.2198543930_4qne.jpg'
    },
    {
        id: 6,
        title: 'The Shawshank Redemption',
        releaseYear: 1994,
        director: 'Frank Darabont',
        src: 'https://www.originalfilmart.com/cdn/shop/products/shawshank_redemption_1994_netherlands_original_film_art_1200x.jpg?v=1572559869'
    },
    {
        id: 7,
        title: 'The Dark Knight',
        releaseYear: 2008,
        director: 'Christopher Nolan',
        src: 'https://m.media-amazon.com/images/I/41nV8UYGlzL._AC_UF894,1000_QL80_.jpg'
    },
    {
        id: 8,
        title: 'Gladiator',
        releaseYear: 2000,
        director: 'Ridley Scott',
        src: 'https://ae01.alicdn.com/kf/S48fa6f0b88b04bbe8899b61144efc493r/MOVIE-GLADIATOR-Russell-Crowe-Canvas-POSTER-Home-Decor-Wall-art-painting.jpg'
    }
];

const getMoviesById = (id) => {
    return movies.find((movie) => movie.id === +id);
};

const moviesController = {
    getMovies: (req, res) => {
        res.status(200).render('movies', { movies: movies });
    },
    getMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = getMoviesById(id);
        if (movieExist) {
            res.render('movie', { movie: movieExist });
        } else {
            res.status(404).render('error', {
                message: `In an alternate universe, the movie with ID ${id} is so crazy that instead of existing, it went on a cosmic journey with dinosaurs and unicorns!`
            });
        }
    },
    postMovie: (req, res) => {
        const { title, releaseYear, directors, src } = req.body;
        const newMovie = {
            id: movies.length + 1,
            title: title,
            releaseYear: releaseYear,
            directors: directors,
            src: src
        };
        movies.push(newMovie);

        res.status(201).json(newMovie);
    },
    putMovie: (req, res) => {
        const { id } = req.params;
        const { title, releaseYear, directors, src } = req.body;

        const movieExist = getMoviesById(id);
        if (movieExist) {
            const updatedMovie = req.body;
            movies = movies.map((movie) => {
                if (movie.id === movieExist.id) {
                    return updatedMovie;
                }
                return movie;
            });
            res.status(200).json({
                message: `Movie with id: ${id} updated`,
                movie: getMoviesById(id)
            });
        } else {
            res.status(404).json({
                message: `Movie with id: ${id} does not exist`
            });
        }
    },

    deleteMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = getMoviesById(id);
        if (movieExist) {
            movies = movies.filter((movie) => movie.id !== +id);
            res.status(200).json({ message: `Movie with id: ${id} deleted` });
        } else {
            res.status(404).json({
                message: `Movie with id: ${id} does not exist`
            });
        }
    }
};

export default moviesController;
