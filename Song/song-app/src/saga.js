import { all } from 'redux-saga/effects';
import { watchFetchSongs, watchCreateSong, watchUpdateSong, watchDeleteSong } from './features/songs/songsSaga';

export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchCreateSong(),
    watchUpdateSong(),
    watchDeleteSong(),
  ]);
}