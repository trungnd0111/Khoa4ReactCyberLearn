import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTaskApi, checkTaskApi, deleteTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListAction';
import { GET_TASK_API } from '../../redux/constants/ToDoListConst';

export default function TodolistRedux(props) {

    const {taskList} = useSelector(stat => stat.ToDoListReducer);

    const dispatch = useDispatch()

  let [state, setState] = useState({
    values: {
      taskName: ''
    },
    errors: {
      taskName: ''
    }
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    let newValues = { ...state.values };

    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors };

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === '') {
      newErrors[name] = name + ' invalid !';
    } else {
      newErrors[name] = '';
    }


    setState({
      ...state,
      values: newValues,
      errors: newErrors
    })
  }


  const getTaskList = () => {
    dispatch(getTaskListApi())
  }

  const addTask = (e) => {
    e.preventDefault();
    dispatch(addTaskApi(state.values.taskName))
  }

  useEffect(() => {
    getTaskList();


    return () => {

    }
  }, [])

  //Xử lý reject task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName))

  }

  //Xử lý done task
  const checkTask = (taskName) => {
    dispatch(checkTaskApi(taskName))
  }


  //Hàm xử lý xóa task
  const delTask = (taskName) => {
    dispatch(deleteTaskApi(taskName))
  }


  const renderTaskToDo = () => {
    return taskList.filter(item => !item.status).map((item, index) => {
        return <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
                <button className="remove" type="button" onClick={() => {
                    delTask(item.taskName)
                }}>
                    Trash
                </button>
                <button type="button" className="complete" onClick={() => {
                    checkTask(item.taskName)
                }}>
                    Check
                </button>
            </div>
        </li>
    })
}


const renderTaskToDoDone = () => {
    return taskList.filter(item => item.status).map((item, index) => {
        return <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
                <button className="remove" type="button" onClick={() => {
                    delTask(item.taskName)
                }}>
                    Trash
                </button>
                <button type="button" className="complete" onClick={() => {
                    rejectTask(item.taskName)
                }}>
                    Check
                </button>
            </div>
        </li>
    })
}


  return (
    <div className="card">
      <div className="card__header">
        <img src={require('./img/X2oObC4.png')} />
      </div>
      {/* <h2>hello!</h2> */}
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input id="newTask" name="taskName" type="text" placeholder="Enter an activity..." onChange={handleChange} />
            <button id="addItem" type="submit" onClick={addTask}>
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskToDo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskToDoDone()}
            </ul>
          </div>
        </div>
      </form>
    </div>

  )
}