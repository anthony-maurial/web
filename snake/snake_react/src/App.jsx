import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [count, setCount] = useState(0)

  const canvasRef = useRef(null)

  const applex = useRef(0)
  const appley = useRef(0)

  const dir = useRef(null)

  const tail = useRef([
    { x: 300, y: 300 },
  ])

  const snake_eat = useRef(false)

  const height = 600
  const width = 600
  const cellSize = 20


  useEffect(() => {
    document.documentElement.lang = 'fr'
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    iniatialization()

    ctx.fillStyle = 'green'
    ctx.fillRect(tail.current[0].x, tail.current[0].y, cellSize, cellSize)

    const draw = () => {
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = "white";

      for (let row = 0; row < height / cellSize; row++) {
        for (let column = 0; column < width / cellSize; column++) {
          let x = column * cellSize
          let y = row * cellSize
          ctx.strokeRect(x, y, cellSize, cellSize)
        }
      }

      ctx.fillStyle = "red"
      ctx.fillRect(applex.current, appley.current, cellSize, cellSize)
      ctx.fillStyle = "green"
      for(let segment of tail.current){
        ctx.fillRect(segment.x, segment.y, cellSize, cellSize)
      }
      requestAnimationFrame(draw)
    }

    setInterval(() => {
      snake_eat.current = false

      const temp_last_x = tail.current[tail.current.length - 1].x
      const temp_last_y = tail.current[tail.current.length - 1].y

      for (let i = tail.current.length - 1; i > 0 ; i--) {
        tail.current[i].x = tail.current[i - 1].x
        tail.current[i].y = tail.current[i - 1].y
      }

      if (dir.current === 'up' && tail.current[0].y > 0) {
        tail.current[0].y -= cellSize
      } else if (dir.current === 'down' && tail.current[0].y + cellSize < height) {
        tail.current[0].y += cellSize
      } else if (dir.current === 'left' && tail.current[0].x > 0) {
        tail.current[0].x -= cellSize
      } else if (dir.current === 'right' && tail.current[0].x + cellSize < width) {
        tail.current[0].x += cellSize
      }

      is_a_apple()

      if (snake_eat.current) {
        tail.current.push({ x: temp_last_x, y: temp_last_y })
        setCount(prevcount => prevcount + 1)
        iniatialization()
      }
    }, 300);

    draw()
  }, [])

  const iniatialization = () => {
    let valid = false
    let i;
    let error;
    let newY, newX;

    while (!valid) {
      newX = Math.floor(Math.random() * (width / cellSize)) * cellSize
      newY = Math.floor(Math.random() * (width / cellSize)) * cellSize

      i = 0
      error = false
      while (i < tail.current.length && !error) {
        if (tail.current[i].x === newX && tail.current[i].y === newY) {
          error = true
        }
        i++
      }
      if (!error) {
        valid = true
        applex.current = newX
        appley.current = newY
      }
    }
  }

  const is_a_apple = () => {
    if (tail.current[0].x === applex.current && tail.current[0].y === appley.current ) {
      snake_eat.current = true
    }
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        dir.current = 'up'
        break;
      case "ArrowDown":
        dir.current = 'down'
        break;
      case "ArrowLeft":
        dir.current = 'left'
        break;
      case "ArrowRight":
        dir.current = 'right'
        break;
      default:
        break;
    }
  }

  return (
    <div class='game-container'>
      <h1>{count}</h1>
      <canvas tabIndex={0} ref={canvasRef} height={600} width={600} onKeyDown={handleKeyDown}></canvas>
    </div>
  );
}

export default App;
