import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OneRowPL from '../OneRowPL/OneRowPL';
import AddNewTask from '../addNewTask/AddNewTask';
import styles from './style.module.css'


export default function PrivateBlock() {
    const [taskList, setTaskList] = useState([]);

    const getNewTaskList = () => {
        axios.
        get('http://localhost:2087/todo')
        .then(res => {
            console.log('get new task list 👌');
            setTaskList(res.data);
        });
    };

    useEffect(() => {
        getNewTaskList();
    },[]);

    // 'All' buttons

    const deleteAll = (e) => {
        e.preventDefault();
        axios 
        .delete('http://localhost:2087/todo/all')
        .then(() => getNewTaskList())
        .catch(err => console.log(err))
    }

    const handleDone = (e) => {
        e.preventDefault();
        const noDoneArr = taskList.filter(v => v.done == false);
        const body = {done:true}
        noDoneArr.forEach(v => {
            axios
            .put('http://localhost:2087/todo/'+v._id, body)
            .catch(err => console.log(err))
            .then(() => getNewTaskList())
        });
    }

    const handleNoDone = (e) => {
        e.preventDefault();
        const doneArr = taskList.filter(v => v.done == true);
        console.log(doneArr);
        const body = {done: false}
        doneArr.forEach(v => {
            console.log(v._id);
            axios
            .put('http://localhost:2087/todo/'+v._id, body)
            .catch(err => console.log(err))
            .then(() => getNewTaskList())
        });
    }

    
  return (
    <div className={styles.privateBlock}>
        <div className={styles.title}>
            <h1>What do you have to do?</h1>
        </div>

        <table className={styles.table}>
            <tbody>
            {taskList.map(task => <OneRowPL task={task} setTaskList={setTaskList} getNewTaskList={getNewTaskList}/>)}
            </tbody>
        </table>

        <div className={styles.buttonsRow}>
            <button onClick={deleteAll}><i class="fa fa-trash"></i> Delete All</button>
            <button onClick={handleDone}><i class="fa fa-check"></i> Done All</button>
            <button onClick={handleNoDone}><i class="fa fa-xmark"></i> Didn`t Do All</button>
        </div>

        <div>
            <AddNewTask getNewTaskList={getNewTaskList}/>
        </div>
    </div>
  )
}
