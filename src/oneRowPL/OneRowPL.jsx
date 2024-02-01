import axios from 'axios'
import React from 'react'
import styles from './style.module.css'


export default function OneRowPL({task, getNewTaskList}) {
    const originalDate = task.date;
    const dateCut = originalDate.split('T')[0].split('-').reverse().join('/');

    const calculateHoursLeft = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const timeDifference = dueDateObj - currentDate;
        const hoursLeft = Math.ceil(timeDifference / (1000 * 60 * 60));
        return hoursLeft;
    };
    

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
    <tr className={`${styles.oneRow} ${task.done? styles.yes: styles.not}`}>
    {/* <tr className={styles.oneRow}> */}
        <td><input type="checkbox" onClick={handleDone} checked={task.done}/></td>
        <td>{task.title}</td>
        <td className={styles.timetd}>{dateCut}        ~  {calculateHoursLeft(task.date)} hours left</td>
        <td><button onClick={handleDelete}><i class="fa fa-trash"></i> Delete</button></td>
    </tr>
  )
}
