import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'


interface Expenses {
  expenses: Expense[],
  amount: number,
}

interface Expense {
  id: number,
  title: string,
  price: number,
  isExpense: boolean,
}

const initialState: Expenses = {
  expenses: [],
  amount: 0,
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(el => el.id !== action.payload.id)
    },
    updateAmount: (state) => {
      state.amount = state.expenses.reduce((acc, el) => el.isExpense ? acc - el.price : acc + el.price , 0)
    }
  },
})

export const { addExpense, removeExpense, updateAmount } = expensesSlice.actions

export const expenses = (state: RootState) => state.expenses.expenses
export const amount = (state: RootState) => state.expenses.amount

export default expensesSlice.reducer