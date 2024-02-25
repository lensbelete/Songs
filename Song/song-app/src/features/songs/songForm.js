import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSong, updateSong } from './songsSlice';

const SongForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState(null);
  const songs = [
    { id: 1, title: 'Song 1', body: 'Song 1 body' },
    { id: 2, title: 'Song 2', body: 'Song 2 body' },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      dispatch(updateSong({ id, title, body }));
      setId(null);
      setTitle('');
      setBody('');
    } else {
      dispatch(createSong({ title, body }));
      setTitle('');
      setBody('');
    }
  };

  const handleEdit = (song) => {
    setId(song.id);
    setTitle(song.title);
    setBody(song.body);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Body:
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </label>
      <button type="submit">{id ? 'Update' : 'Create'}</button>
      {songs.map((song) => (
        <button key={song.id} onClick={() => handleEdit(song)}>
          Edit {song.title}
        </button>
      ))}
    </form>
  );
};

export default SongForm;