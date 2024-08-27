import { useDispatch, useSelector } from "react-redux"
import { maxLimits, setCount, setMaxLimitLevel } from "../state/FixSlice";

const FixUp = () => {
    const {maxLimitLevel, count} = useSelector(state => state.fix)
    const dispatch = useDispatch()
    
    const onhandleUpLimit = ()=>{      
        if(maxLimits.length > maxLimitLevel && maxLimits[maxLimitLevel]?.price <= count){
            dispatch(setMaxLimitLevel(+maxLimitLevel+1))
            dispatch(setCount(count - maxLimits[maxLimitLevel]?.price))
        }
    }    

    return (
        <div className="flex flex-col gap-[2em] p-[5em] border-8 border-blue-950 rounded-[1em] bg-blue-100">
            <p className="text-[2.5em]">Energy limit</p>
            <div className="flex items-center gap-[.5em] text-[3em]">
                <button className="px-[.5em] py-[.1em] rounded-[1em] bg-orange-400 text-white font-bold flex justify-center items-center" onClick={onhandleUpLimit}>
                    <p className="relative bottom-[.1em]">{maxLimits[maxLimitLevel]?.price || 'MAX'}</p>
                </button>
                <p className="relative bottom-[.2em]">{maxLimits[maxLimitLevel] && +maxLimitLevel+1 + 'lvl' || 'Max lvl'}</p>
            </div>

            <div className="h-[.1em] bg-slate-600"/>

            {/* <div className="flex items-center gap-[.5em] text-[3em]">
                <button className="px-[.5em] py-[.1em] rounded-[1em] bg-orange-400 text-white font-bold flex justify-center items-center">
                    <p className="relative bottom-[.1em]">{maxLimits[maxLimitLevel].price}</p>
                </button>
                <p className="relative bottom-[.2em]">maxLimit: {maxLimit}</p>
            </div> */}
        </div>
    )
}

export default FixUp
