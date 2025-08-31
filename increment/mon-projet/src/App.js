import './App.css';
import { useState } from "react";

const App = () => {

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    console.log(count);
  }

  const handleDecrement = () => {
    setCount(count - 1);
    console.log(count);
  }

  return (
    <>
      <h2>count : {count}</h2>
      <button onClick={handleIncrement}> increment </button>
      <button onClick={handleDecrement}> decrement </button>
    </>
  );
}

export default App;
