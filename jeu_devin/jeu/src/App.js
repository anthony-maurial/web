import './App.css';
import { useState } from "react";

function App() {
  const [nb_found, setnb_found] = useState(0)
  const [nb_choose, setnb_choose] = useState(0)
  const [msg, setmsg] = useState("")
  const [count, setcount] = useState(0)

  const new_number_random = () => {
    setcount(0)
    setnb_choose("")
    const number_random = Math.floor(Math.random() * 100)
    setnb_found(number_random)
  }

  const maj_nb_choose = (event) => {
    const input = event.target.value.trim()
    if(!isNaN(input)){
      setnb_choose(Number(input))
    }
  }

  const verif = () => {
    setnb_choose("")
    setcount(count + 1)
    if (nb_choose > nb_found) {
      setmsg("the number you chose is too large")
    } else if (nb_choose < nb_found){
      setmsg("the number you chose is too small")
    } else if (nb_choose === nb_found) {
      setmsg("Congratulations, you found the mystery number.")
    }
    else {
      setmsg("the data you entered is invalid")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      verif()
    }
  }

  return (
    <div>
      <button onClick={new_number_random}>replay</button>
      <input placeholder='Please enter the number to guess' onChange={maj_nb_choose} value={nb_choose} onKeyDown={handleKeyDown}></input>
      <button onClick={verif}>choisir</button>
      <h1>the solution counter tried {count}, {msg}</h1>
    </div>
  );
}

export default App;
