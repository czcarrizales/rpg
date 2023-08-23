import { createSlice } from "@reduxjs/toolkit";

const soundsSlice = createSlice({
    name: 'sounds',
    initialState: {
        playerAttackSound: '/sounds/attack.mp3',
        musicVolume: 0.1,
        soundVolume: 0.3
    },
    reducers: {
        setPlayerAttackSound: (state, action) => {
            state.playerAttackSound = action.payload
        },
        setMusicVolume: (state, action) => {
            state.musicVolume = action.payload
        },
        setSoundVolume: (state, action) => {
            state.soundVolume = action.payload
        }
    }
})

export const { setPlayerAttackSound, setMusicVolume, setSoundVolume } = soundsSlice.actions;
export default soundsSlice.reducer