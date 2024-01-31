import axios from 'axios'
import React from 'react'
import styles from './style.module.css'


export default function OneRowPL({task, setTaskList, getNewTaskList}) {

    const handleDelete = () => {
        axios
        .delete('/' + task._id)
        .then(res => console.log(res.data));
        getNewTaskList()
    }

    const handleDone = (e) => {
        const checkedNow = e.target.checked;
        axios
        .put(''+task._id, {done: !checkedNow})
        .then(res => console.log(res.data));
        getNewTaskList()
    }


  return (
    <div className={styles.oneRow}>
        <input type="checkbox" onClick={handleDone}/>
        <div>{task.title}</div>
        <div>{task.date}</div>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
