import React, { useState , ChangeEvent} from 'react'
import {removeTask, updateTask} from '../redux/tasksSlice';
import { useAppDispatch} from '../hooks';

interface ITask {
  title: string,
  id: number,
}
interface IProps {
  el: ITask,
}

export const Tasks: React.FC<IProps> = ({ el }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  const dispatch = useAppDispatch();

  const setTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value)
  }

  const editHandler = (el: ITask) => {
    setIsOpenEdit(true);
    setTitleValue(el.title);
  }

  const saveEdit = (el: ITask) => {
    if (titleValue.trim()) {
      setIsOpenEdit(false);
      const newTask = {
        title: titleValue.trim(),
        id: el.id
      };

      dispatch(updateTask({newTask}));
    }
  };

  const removeTaskHandler = (id: number) => {
    dispatch(removeTask({id}))
  }
  
  return (
    <div style={{marginTop: '10px'}}>
      {isOpenEdit
      ? <>
          <input value={titleValue} onChange={(e) => setTitleInput(e)} />
          <button onClick={() => saveEdit(el)}>Сохранить</button>
        </>
      : <>
          <span>{el.title}</span>
          <button style={{ margin: '0 10px' }} onClick={() => editHandler(el)}>Изменить</button>
          <button onClick={() => removeTaskHandler(el.id)}>Удалить</button>
        </>
      }
    </div>)
}
