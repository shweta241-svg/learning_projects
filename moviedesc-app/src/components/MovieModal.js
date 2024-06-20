import React, { useState } from 'react';


function MovieModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSave = () => {
    onSave({ name, description, image });
    setName('');
    setDescription('');
    setImage('');
  };

  return (
    <div className="modal" onDoubleClick={onClose}>
      <div className="modal-content">
        <h2>Add a new movie</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default MovieModal;
