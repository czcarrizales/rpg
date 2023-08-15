import { createSlice } from "@reduxjs/toolkit";

const soundsSlice = createSlice({
    name: 'sounds',
    initialState: {
        playerAttackSound: '/sounds/attack.mp3',
        musicVolume: 0.1
    },
    reducers: {
        setPlayerAttackSound: (state, action) => {
            state.playerAttackSound = action.payload
        },
        setMusicVolume: (state, action) => {
            state.musicVolume = action.payload
        }
    }
})

export const { setPlayerAttackSound, setMusicVolume } = soundsSlice.actions;
export default soundsSlice.reducer