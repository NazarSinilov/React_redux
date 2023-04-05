import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'


interface Tasks {
  tasks: Task[],
}

interface Task {
  id: number,
  title: string,
}

const initialState: Tasks = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(el => el.id !== action.payload.id)
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.newTask.id )
      if (index !== -1) {
        state.tasks[index] = action.payload.newTask;
      }
    }
  },
})

export const {getTasks, addTask, removeTask, updateTask } = tasksSlice.actions

export const tasks = (state: RootState) => state.tasks.tasks;

export default tasksSlice.reducer