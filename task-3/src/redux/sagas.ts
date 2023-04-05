import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_TASKS_REQUEST, fetchTasksFailure } from './actions';
import {getTasks} from './tasksSlice'

function* fetchTasks(): any {
  try {
    const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos?_limit=5&offset=0');
    const data = yield response.json();
    yield put(getTasks(data));
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

export function* fetchTasksWatcher() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasks);
}