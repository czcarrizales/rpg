import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        resettingGame: false,
        currentWorld: 1
    },
    reducers: {
        resetGame: (state) => {
            state.resettingGame = !state.resettingGame
        },
        setCurrentWorld: (state) => {
            state.currentWorld += 1
        }
    }
})

export const {resetGame, setCurrentWorld} = gameSlice.actions;
export default gameSlice.reducer