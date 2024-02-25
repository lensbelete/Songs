import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, resetSongs } from './songsSlice';
import SongItem from './SongItem';
import SongForm from './songForm';

const SongsList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.list);

  const handleFetchSongs = () => {
    dispatch(fetchSongs());
  };

  const handleResetSongs = () => {
    dispatch(resetSongs());
  };

  return (
    <div>
      <h1>Songs</h1>
      <button onClick={handleFetchSongs}>Fetch Songs</button>
      <button onClick={handleResetSongs}>Reset Songs</button>
      <ul>
        {songs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </ul>
      <SongForm />
    </div>
  );
};

export default SongsList;