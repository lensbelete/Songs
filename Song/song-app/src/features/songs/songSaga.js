import { all, takeLatest, put, call } from 'redux-saga/effects';
import { createSong, updateSong, deleteSong, fetchSongs } from './songsSlice';
import axios from 'axios';

function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts');
    yield put(fetchSongs.fulfilled(response.data));
  } catch (error) {
    yield put(fetchSongs.rejected(error.message));
  }
}

function* createSongSaga(action) {
  try {
    const response = yield call(axios.post, 'https://jsonplaceholder.typicode.com/posts', action.payload);
    yield put(createSong.fulfilled(response.data));
  } catch (error) {
    yield put(createSong.rejected(error.message));
  }
}

function* updateSongSaga(action) {
  try {
    const response = yield call(axios.put, `https://jsonplaceholder.typicode.com/posts/${action.payload.id}`, action.payload);
    yield put(updateSong.fulfilled(response.data));
  } catch (error) {
    yield put(updateSong.rejected(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(axios.delete, `https://jsonplaceholder.typicode.com/posts/${action.payload}`);
    yield put(deleteSong.fulfilled(action.payload));
  } catch (error) {
    yield put(deleteSong.rejected(error.message));
  }
}

export default function* songsSaga() {
  yield all([
    takeLatest(fetchSongs.type, fetchSongsSaga),
    takeLatest(createSong.type, createSongSaga),
    takeLatest(updateSong.type, updateSongSaga),
    takeLatest(deleteSong.type, deleteSongSaga),
  ]);
}