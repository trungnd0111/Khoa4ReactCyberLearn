import React, { Component } from 'react'
import './ToDoList.css'
import Axios from 'axios'
export default class ToDoListRCC extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = Axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((result) => {
            console.log(result.data)
            this.setState({
                taskList: result.data
            })
        });
        promise.catch((err) => {
            console.log(err.response.data)
        });
    }
    //Hàm tự động thực thi sau khi nội dung component thực thi
    componentDidMount() {
        this.getTaskList()
    }

    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={()=>{
                        this.deleteTask(item.taskName)
                    }}>
                        Trash
                    </button>
                    <button type="button" className="complete" onClick={()=>{
                        this.doneTask(item.taskName)
                    }}>
                        Check
                    </button>
                </div>
            </li>
        })
    }

    doneTask = (taskName) =>{
        let promise = Axios({
            url:`https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method:'PUT'
        })
        promise.then(result=>{
            this.getTaskList()
        })
        promise.catch(error=>{
            alert(error.response.data)
        })
    }

    renderTaskDone = () => {
        return this.state.taskList.filter(task => task.status).map((item, index) => {
            return <li>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={()=>{
                        this.deleteTask(item.taskName)
                    }}>
                        Trash
                    </button>
                    <button type='button' className="complete" onClick={()=>{
                        this.rejectTask(item.taskName)
                    }}>
                        Check
                    </button>
                </div>
            </li>
        })
    }

    rejectTask = (taskName) =>{
        let promise = Axios({
            url:`https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method:'PUT'
        })
        promise.then(result=>{
            this.getTaskList()
        })
        promise.catch(error=>{
            alert(error.response.data)
        })
    }

    addTask = (e) => {
        e.preventDefault();

        let promise = Axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: this.state.values.taskName }
        })
        promise.then(result=>{
            this.getTaskList()
        })
        promise.catch(error=>{
            alert(error.response.data)
        })

    }

    deleteTask=(taskName) =>{
        let promise = Axios({
            url:`https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method:'DELETE'
        })
        promise.then(result=>{
            this.getTaskList()
        })
        promise.catch(error=>{
            alert(error.response.data)
        })
    }

    handleChange = (e) => {
        let { value, name } = e.target;
        let newValues = { ...this.state.values};
        newValues = {...newValues, [name]: value }
        let newErrors = { ...this.state.errors };

        let regexString = /^[a-z A-Z]+$/;
        if (!regexString.test(value) || value.trim()==='') {
            newErrors[name] = name + 'invalid'
        } else {
            newErrors[name] = ' ';
        }
        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        }, () => {
            console.log(this.state)
        })
    }

    render() {
        return (
            <form onSubmit={this.addTask}>
                <div className="card">
                    {/* <button onClick={() => {
                        this.getTaskList()
                    }}>CLICK</button> */}
                    <div className="card__header">
                        <img src={require('./img/X2oObC4.png')} />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input name='taskName' onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
                                <button id="addItem" onClick={this.addTask}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p className='text text-danger'>{this.state.errors.taskName}</p>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskDone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
