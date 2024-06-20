import React, { useState } from 'react';
import MovieList from './components/MovieList';
import './components/style.css';
// import MovieModal from './components/MovieModal';

function App() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMovie, setNewMovie] = useState({ name: '', description: '', image: '' });

  const toggleModal = () => setShowModal(!showModal);

  const addMovie = () => {
    setMovies([...movies, newMovie]);
    setNewMovie({ name: '', description: '', image: '' });
    toggleModal();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Collection</h1>
      </header>
      <div className='app-content'>

        <button className ='add-btn 'onClick={toggleModal}> + Add Movie</button>
        <MovieList movies={movies} setMovies={setMovies} />
        

        {showModal && (
          <div className="modal-backdrop" onDoubleClick={toggleModal}>
            <div className='modal'>
            <h2>Add a New Movie</h2>
            <input
              type="text"
              placeholder="Name"
              value={newMovie.name}
              onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newMovie.description}
              onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newMovie.image}
              onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
            />
            <button onClick={addMovie}>Add Movie</button>
            
          </div>
          </div>
        )}
        {/* {showModal && <MovieModal onClick ={() => setShowModal(false)} onSave={addMovie}/>} */}
        

      </div>
    </div>
  );
}

export default App;
