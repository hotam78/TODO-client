import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OneRowPL from '../OneRowPL/OneRowPL';
import AddNewTask from '../addNewTask/AddNewTask';
import styles from './style.module.css'


export default function PrivateBlock() {
    const [taskList, setTaskList] = useState([]);

    const getNewTaskList = () => {
        console.log(taskList);
        axios.
        get('http://localhost:2087/todo')
        .then(res => {
            console.log(res.data);
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

    const handleDown = () => {
        const noDoneArr = task.filter(v => v.done == false);
        noDoneArr.forEach(v => {
            axios
            .put('http://localhost:2087/todo/'+task._id, {done:true})
        });
        getNewTaskList()
    }

    const handleNoDown = () => {
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
            {taskList.map(task => <OneRowPL task={task} setTaskList={taskList} getNewTaskList={getNewTaskList}/>)}
        </div>

        <div className={styles.buttonsRow}>
            <button onClick={deleteAll}>Delete All</button>
            <button onClick={handleDown}>Done All</button>
            <button onClick={handleNoDown}>Didn`t Do All</button>
        </div>

        <div>
            <AddNewTask getNewTaskList={getNewTaskList}/>
        </div>
    </div>
  )
}
