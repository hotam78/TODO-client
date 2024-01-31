import axios from 'axios';
import React, { useState } from 'react'

export default function AddNewTask({getNewTaskList}) {
    // const [fromInput, setFromInput] = useState({})
    const [titleInput, setTitleInput] = useState('');
    const [dateInput, setInputDate] = useState('')

    const handleChangeT = (e) => {
        setTitleInput(e.target.value);
        console.log(titleInput);
    }

    const handleChangeD = (e) => {
        setInputDate(e.target.value);
        console.log(dateInput);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            title: titleInput,
            date: dateInput
        }
        console.log(body);
        axios
        .post('http://localhost:2087/todo', body)
        .then(()=>{
        setTitleInput('');
        setInputDate('');
        getNewTaskList();
        })
        .catch(error => console.log(error))
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
                <input type='text' name='title' value={titleInput} onChange={handleChangeT} placeholder='task name' required/>
                <input type='date' name='date' value={dateInput} onChange={handleChangeD} required/>
                <button type='submit'>Add</button>
        </form>
    </>
  )
}
