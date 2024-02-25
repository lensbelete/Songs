import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/songs');
  return response.data;
});

export const createSong = createAsyncThunk('songs/createSong', async (song) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/songs', song);
  return response.data;
});

export const updateSong = createAsyncThunk('songs/updateSong', async (song) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/songs/${song.id}`, song);
  return response.data;
});

export const deleteSong = createAsyncThunk('songs/deleteSong', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/songs/${id}`);
  return id;
});

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetSongs: (state) => {
      state.list = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetSongs } = songsSlice.actions;

export default songsSlice.reducer;