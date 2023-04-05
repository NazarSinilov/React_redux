import React, { useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import { Tasks } from './components/Tasks';
import {useAppSelector, useAppDispatch} from './hooks';
import { fetchTasksRequest } from './redux/actions';
import {tasks, addTask} from './redux/tasksSlice';

function App() {
  const [titleValue, setTitleValue] = useState('');
  const tasksArr = useAppSelector(tasks);
  const dispatch = useAppDispatch();

  
  const setTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value)
  }


  const addTaskHandler = () => {
    if(titleValue.trim()) {
      const id = new Date().getTime();
      const newTask = {
        id: id,
        title: titleValue.trim(),
      }
      dispatch(addTask({...newTask}))
      setTitleValue('');
    }
  }

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  console.log(tasksArr);
    
  return (
    <div className="App">
      <h2>Список задач</h2>

      <div>Название задачи</div>
      <input value={titleValue} onChange={setTitleInput}></input>

      <button onClick={addTaskHandler}>Добавить</button>

        {tasksArr?.map((el) => <div key={el.id}>
          <Tasks
            el={el}
          />
        </div>
          
        )}
    </div>
  );
}

export default App;
