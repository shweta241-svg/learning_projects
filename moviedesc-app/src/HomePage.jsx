import React , {useState}from 'react';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
    const addMovie = (movie) => {
      setMovies([...movies, movie]);
      setShowModal(false);
    };
  
    return (
      <div className="app">
        <header className="app-header">
        <h1>Movie Collection</h1>
      </header>
        {/* <h1>Movie List</h1> */}
        <div className='app-content'>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus"></i> Add Movie
        </button>
        <MovieList movies={movies} />

        </div>
        
        {showModal && <MovieModal onClose={() => setShowModal(false)} onSave={addMovie} />}
      </div>
    );
  }

export default HomePage