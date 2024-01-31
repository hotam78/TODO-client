import axios from 'axios'
import React from 'react'
import styles from './style.module.css'


export default function OneRowPL({task, setTaskList, getNewTaskList}) {

    const handleDelete = () => {
        console.log(task._id);
        axios
        .delete('http://localhost:2087/todo/' + task._id)
        .then(res => console.log('res.data',res.data))
        .then(() => getNewTaskList())
    }

    const handleDone = (e) => {
        console.log('handle done');
        const checkedNow = e.target.checked;
        console.log('checkedNow', checkedNow);
        const body = {done : checkedNow}
        axios
        .put('http://localhost:2087/todo/'+task._id, body)
        .then(res => console.log(res.data));
        getNewTaskList()
    }


  return (
    <div className={styles.oneRow}>
        <input type="checkbox" onClick={handleDone} defaultChecked={task.done}/>
        <div>{task.title}</div>
        <div>{task.date}</div>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
