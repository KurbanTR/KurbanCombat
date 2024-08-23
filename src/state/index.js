import { configureStore } from "@reduxjs/toolkit";
import FixReduser from "../state/FixSlice"

export default configureStore({
    reducer: {
        fix: FixReduser
    }
})