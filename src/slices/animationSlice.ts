import { createSlice } from "@reduxjs/toolkit";

const animationSlice = createSlice({
    name: 'animation',
    initialState: {
        stopAnimation: false,
        healAnimation: false,
        fireAnimation: false,
        blizzardAnimation: false,
        thunderAnimation: false,
        quakeAnimation: false,
        poisonAnimation: false,
        protectAnimation: false,

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
        },
        setBlizzardAnimation: (state, action) => {
            state.blizzardAnimation = action.payload
        },
        setThunderAnimation: (state, action) => {
            state.thunderAnimation = action.payload
        },
        setQuakeAnimation: (state, action) => {
            state.quakeAnimation = action.payload
        },
        setPoisonAnimation: (state, action) => {
            state.poisonAnimation = action.payload
        },
        setProtectAnimation: (state, action) => {
            state.protectAnimation = action.payload
        }
    }
})

export const {setStopAnimation, setHealAnimation, setFireAnimation, setBlizzardAnimation, setThunderAnimation, setQuakeAnimation, setPoisonAnimation, setProtectAnimation} = animationSlice.actions;
export default animationSlice.reducer