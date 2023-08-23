import { createSlice } from "@reduxjs/toolkit";

const animationSlice = createSlice({
    name: 'animation',
    initialState: {
        stopAnimation: false,
        healAnimation: false,
        fireAnimation: false
    },
    reducers: {
        setStopAnimation: (state, action) => {
            state.stopAnimation = action.payload
        },
        setHealAnimation: (state, action) => {
            state.healAnimation = action.payload
        },
        setFireAnimation: (state, action) => {
            state.fireAnimation = action.payload
        }
    }
})

export const {setStopAnimation, setHealAnimation, setFireAnimation} = animationSlice.actions;
export default animationSlice.reducer