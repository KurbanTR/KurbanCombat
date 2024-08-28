import { useEffect, useState } from "react";
import FixUp from "../components/FixUp";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, maxLimits, setCount, setLimit } from "../state/FixSlice";
import legendary from '../assets/legendary_lvl.svg'
import coin from '../assets/coin.svg'
import energy from '../assets/energy.svg'

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
          <div className="flex justify-center text-center items-center">
            <img className="w-[100px]" src={coin} alt="" />
            <p className="text-7xl font-normal">{count}</p>
          </div>
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
          className="w-[70em] h-[70em] border-[40px] border-blue-700 bg-gradient-to-b from-[#35389E] to-[#1C2848] rounded-full active:scale-[.99] flex justify-center items-center"
          onClick={handleClick}
        >
          <div className="flex w-[40em] h-[40em] blur-[47.08px] bg-white bg-opacity-50 rounded-full active:scale-[.99] justify-center items-center"/>
          <img className="w-[600px] absolute" src={legendary} alt="" />
        </button>

        <span className="text-[5em] flex items-center font-semibold">Limit <img className="w-16 ml-10" src={energy} alt="" /> {limit} / {maxLimits[maxLimitLevel-1]?.maxLimit}</span>
        <FixUp/>
        <div className="text-[3em] text-white px-[.5em] py-[.2em] bg-red-600 rounded-[.5em]">
          <button onClick={handleDeleteAll}>Deleta All</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
