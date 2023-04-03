import React, { useState, ChangeEvent } from 'react';
import './App.css';
import {expenses, addExpense, removeExpense, amount, updateAmount} from './redux/expensesSlice';
import {useAppSelector, useAppDispatch} from './hooks';

function App() {
  const [titleValue, setTitleValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);

  const expensesArr = useAppSelector(expenses);
  const amountValue = useAppSelector(amount);
  const dispatch = useAppDispatch();

  
  const setTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value)
  }
  const setPriceInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceValue(event.target.value)
  }

  const addExpenseHandler = () => {
    if(titleValue.trim() && priceValue.trim()) {
      const id = new Date().getTime();
      const newExpense = {
        id: id,
        title: titleValue.trim(),
        price: +priceValue.trim(),
        isExpense,
      }
      dispatch(addExpense({...newExpense}))
      dispatch(updateAmount())
      setTitleValue('');
      setPriceValue('');
    }
  }
  
  const removeExpenseHandler = (id: number) => {
    dispatch(removeExpense({id}))
  }
  
  return (
    <div className="App">
      <h2>Добавить расходы</h2>

      <div>Описание</div>
      <input value={titleValue} onChange={setTitleInput}></input>

      <div>Цена</div>
      <input type='number' value={priceValue} onChange={setPriceInput}></input>

      <div className={isExpense ? 'expCheck' : 'incomeCheck'} onClick={() => setIsExpense(prev => !prev)}>{isExpense ? 'Расход' : 'Приход' }</div>
    
      <button onClick={addExpenseHandler}>Добавить</button>
      <div>Общая сумма: {amountValue}</div>

        {expensesArr?.map((el) => <div key={el.id} className={el.isExpense ? 'expense default' : 'income default'}>
          <span>Описание:{el.title}</span>
          <span style={{margin: '0 10px'}}>Цена:{el.price}</span>
          <button onClick={() => removeExpenseHandler(el.id)}>Удалить</button>
        </div>)}
    </div>
  );
}

export default App;
