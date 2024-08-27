import { useEffect, useState } from "react";
import FixUp from "../components/FixUp";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, maxLimits, setCount, setLimit } from "../state/FixSlice";

const MainPage = () => {
  const {maxLimitLevel, count, limit} = useSelector(state => state.fix);
  const [level, setLevel] = useState(1);

  const dispatch = useDispatch()
  
  const handleClick = () => {
    console.log(limit);
  
    if (limit >= 3) {
      dispatch(setCount(+count + 3));
      dispatch(setLimit(+limit - 3));
    } else {
      dispatch(setLimit(limit));
    }
  };

  const handleDeleteAll = ()=>{
    dispatch(deleteAll())
  }
  
  const maxCount = [{name: 'Bronze', count: 5000}, {name: 'Silver', count: 25000}, {name: 'Gold', count: 100000}, {name: 'Platinum', count: 1000000}, {name: 'Diamond', count: 5000000}, {name: 'Epic', count: 10000000}, {name: 'Legendary', count: 50000000}, {name: 'Master', count: 100000000}, {name: 'Grandmaster', count: 1000000000}, {name: 'Lord', count: 18000000000}, {name: 'Creator', count: 'Max'}];
  const levelWidth = (count / maxCount[level]?.count) * 100;

  useEffect(() => {
    if (maxCount[level]?.count <= count) {
      setLevel(level + 1);
    }
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentLimit = limit < maxLimits[maxLimitLevel - 1]?.maxLimit 
                          ? +limit + 3 
                          : limit;
      dispatch(setLimit(currentLimit));
    }, 1000);

    return () => clearInterval(interval);
  }, [limit, maxLimitLevel, dispatch]);

  return (
    <div className="container">
      <div className="w-screen flex flex-col gap-20 items-center justify-center">
        <div className="w-[50%] flex flex-col items-center">
          <div className="flex justify-between text-[5em] w-full">
            <p>{count}</p>
            <p>{maxCount[level].count}</p>
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
