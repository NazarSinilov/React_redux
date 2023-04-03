import React, { useState, ChangeEvent } from 'react';
import './App.css';
import {users, addUser, removeUser} from './redux/userSlice';
import {useAppSelector, useAppDispatch} from './hooks';

function App() {
  const [inputValue, setInputValue] = useState('');

  const usersArr = useAppSelector(users);
  const dispatch = useAppDispatch();

  
  const setInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const addUserHandler = () => {
    if(inputValue.trim()) {
      const id = new Date().getTime();
      const newUser = {
        id,
        userName: inputValue.trim(),
      }
      dispatch(addUser({...newUser}))
      setInputValue('');
    }
  }

  const removeUserHandler = (id: number) => {
    dispatch(removeUser({id}))
  }
  
  return (
    <div className="App">
      <h2>Добавить пользователя</h2>
      <input value={inputValue} onChange={setInput}></input>
      <button onClick={addUserHandler}>Добавить</button>
        {usersArr?.map((el) => <div key={el.id} style={{margin: '20px'}}>
          <span>{el.userName}</span>
          <button onClick={() => removeUserHandler(el.id)}>Delete user</button>
        </div>)}
    </div>
  );
}

export default App;
