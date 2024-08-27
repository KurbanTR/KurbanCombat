import { createSlice } from "@reduxjs/toolkit"

export const maxLimits = [
    {
        maxLimit: 100,
    },
    {
        maxLimit: 200,
        price: 200,
    },
    {
        maxLimit: 300,
        price: 300,
    },
    {
        maxLimit: 400,
        price: 400,
    },
    {
        maxLimit: 500,
        price: 500,
    },
    {
        maxLimit: 600,
        price: 600,
    }
]

const FixSlice = createSlice({
    name: 'fix',
    initialState: {
        count: Number(localStorage.getItem('count')) || 200,
        limit: Number(localStorage.getItem('limit')) || maxLimits[Number(localStorage.getItem('maxLimitLevel'))]?.maxLimit || 100,
        click: Number(localStorage.getItem('click')) || 1,
        maxLimitLevel: Number(localStorage.getItem('maxLimitLevel')) || 1
    },
    reducers: {
        setCount(state, actions){
            state.count = actions.payload
            localStorage.setItem('count', actions.payload)
        },
        setLimit(state, actions){
            state.limit = actions.payload
            localStorage.setItem('limit', actions.payload)
        },
        setClick(state, actions){
            state.click = actions.payload
            localStorage.setItem('click', actions.payload)
        },
        setMaxLimitLevel(state, actions){
            state.maxLimitLevel = actions.payload
            localStorage.setItem('maxLimitLevel', actions.payload)
        },
        deleteAll(){
            localStorage.clear()
            location.reload()
        }
    },
    // extraReducers: (bilder) => {

    // }

})


export const { setClick, setMaxLimitLevel, deleteAll, setCount, setLimit } = FixSlice.actions
export default FixSlice.reducer