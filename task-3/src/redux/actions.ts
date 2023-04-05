export const FETCH_TASKS_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_TASKS_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksFailure = (error: any) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});
