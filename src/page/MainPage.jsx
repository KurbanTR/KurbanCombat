import { useEffect, useState } from "react";
import FixUp from "../components/FixUp";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, maxLimits, setCount } from "../state/FixSlice";

const MainPage = () => {
  const {maxLimitLevel, count} = useSelector(state => state.fix)
  const [level, setLevel] = useState(1);
  const [limit, setLimit] = useState(maxLimits[maxLimitLevel-1]?.maxLimit);

  const dispatch = useDispatch()
  
  const handleClick = () => {
    console.log(limit);      
    setLimit((prevLimit) => {
      if (prevLimit >= 3) {
        dispatch(setCount(+count + 3));
        return prevLimit - 3;
      }
      return prevLimit;
    });
  };

  const handleDeleteAll = ()=>{
    dispatch(deleteAll())
  }
  
  const maxCount = [100, 2500, 10000, 500000, 1000000, 10000000];
  const levelWidth = (count / maxCount[level]) * 100;

  useEffect(() => {
    if (maxCount[maxLimitLevel-1]?.maxLimit <= count) {
      setLevel(level + 1);
    }
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLimit((prevLimit) => (prevLimit < maxLimits[maxLimitLevel-1]?.maxLimit ? prevLimit + 3 : prevLimit));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="w-screen flex flex-col gap-20 items-center justify-center">
        <div className="w-[50%] flex flex-col items-center">
          <div className="flex justify-between text-[5em] w-full">
            <p>{count}</p>
            <p>{maxCount[level]}</p>
          </div>
          <div className="h-[3em] w-full rounded-full bg-slate-500 overflow-hidden">
            <div
              className="bg-violet-400 rounded-full h-[3em]"
              style={{ width: `${levelWidth}%` }}
            />
          </div>
        </div>
        <button
          className="w-[70em] h-[70em] border-8 border-[blue] bg-blue-800 rounded-full active:scale-[.99] flex justify-center items-center"
          onClick={handleClick}
        />
        <span className="text-[5em] font-semibold">Limit {limit} / {maxLimits[maxLimitLevel-1]?.maxLimit}</span>
        <FixUp/>
        <div className="text-[3em] text-white px-[.5em] py-[.2em] bg-red-600 rounded-[.5em]">
          <button onClick={handleDeleteAll}>Deleta All</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
