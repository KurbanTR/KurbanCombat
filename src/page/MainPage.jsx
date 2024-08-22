import { useEffect, useState } from "react"

const MainPage = () => {
  const [count, setCount] = useState(0);
  const [level, setLevel] = useState(1);

  const handleClick = () => {
    setCount(count+1)
  }

  const maxCount = [100, 2500, 10000, 500000, 1000000, 10000000]
  const levelWidth = (count / maxCount[level]) * 100
  console.log(levelWidth);
  
  useEffect(()=>{
    maxCount[level] <= count && setLevel(level+1)
  }, [count, level])

  return (
    <div className="container">
        <div className="w-screen flex flex-col gap-20 items-center justify-center">
          <div className="w-[50%] flex flex-col items-center">
            <div className="flex justify-between text-[5em] w-full">
              <p>{count}</p>
              <p>{maxCount[level]}</p>
            </div>
            <div className="h-[3em] w-full rounded-full bg-slate-500 overflow-hidden">
              <div className='bg-violet-400 rounded-full h-[3em]' style={{width: `${levelWidth}%`}}></div>
            </div>
          </div>
          <button className="w-[70em] h-[70em] border-8 border-[blue] bg-blue-800 rounded-full active:scale-[.99] flex justify-center items-center" onClick={handleClick}>

          </button>
        </div>
    </div>
  )
}

export default MainPage
