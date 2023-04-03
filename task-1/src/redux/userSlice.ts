import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'


interface IUsers {
  users: IUser[],
}

interface IUser {
  id: number,
  userName: string,
}

const initialState: IUsers = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(el => el.id !== action.payload.id)
    },
  },
})

export const { addUser, removeUser } = usersSlice.actions

export const users = (state: RootState) => state.users.users

export default usersSlice.reducer