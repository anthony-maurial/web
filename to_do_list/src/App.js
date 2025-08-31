import './App.css';
import React, {useState, useRef} from 'react';

function App() {

  const [task, setTask] = useState("")
  const [listTask, setlistTask] = useState({})
  let count = useRef(0)

  const add_task = (event) => {
    setTask(event.target.value.trim())
  }

  const add_task_button = () => {
    if (task.trim() === ""){
      return
    }
    setlistTask({...listTask, [count.current] : task})
    count.current++
    setTask("")
  }

  const delete_task = (key) => {
    const listTaskCopy = {...listTask}
    delete listTaskCopy[key]
    setlistTask(listTaskCopy)
  }

  const handle_keyDown = (e) => {
    if (e.key === 'Enter'){
      add_task_button()
    }
  }

  return (
    <div class='container'>
      <div class="input-group">
        <input placeholder='enter your task' onChange={add_task} value={task} onKeyDown={handle_keyDown}></input>
        <button onClick={add_task_button}>add task</button>
      </div>
      <div>
        <ul>
          {Object.entries(listTask).map(([key, task]) => 
          <li key={key}>
            {task}
            <button onClick={() => delete_task(key)}>X</button>
          </li>)}
        </ul>
      </div>
    </div>
  );
};
export default App;