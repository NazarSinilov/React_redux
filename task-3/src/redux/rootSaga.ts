import { all } from 'redux-saga/effects';
import { fetchTasksWatcher } from './sagas';

export default function* rootSaga() {
  yield all([
    fetchTasksWatcher(),
  ]);
}