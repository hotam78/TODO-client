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

    const deleteAll = () => {
        axios 
        .delete('http://localhost:2087/todo/all');
        getNewTaskList()
    }

    const handleDone = () => {
        const noDoneArr = task.filter(v => v.done == false);
        noDoneArr.forEach(v => {
            axios
            .put('http://localhost:2087/todo/'+task._id, {done:true})
        });
        getNewTaskList()
    }

    const handleNoDone = () => {
        const doneArr = task.filter(v => v.done == true);
        doneArr.forEach(v => {
            axios
            .put('http://localhost:2087/todo/'+task._id, {done:false})
        });
        getNewTaskList()
    }

    
  return (
    <div>
        <div>
            <h1>What do you have to do?</h1>
        </div>

        <div>
            {taskList.map(task => <OneRowPL task={task} setTaskList={setTaskList} getNewTaskList={getNewTaskList}/>)}
        </div>

        <div className={styles.buttonsRow}>
            <button onClick={deleteAll}>Delete All</button>
            <button onClick={handleDone}>Done All</button>
            <button onClick={handleNoDone}>Didn`t Do All</button>
        </div>

        <div>
            <AddNewTask getNewTaskList={getNewTaskList}/>
        </div>
    </div>
  )
}
