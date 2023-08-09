import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        resettingGame: false,
        currentWorld: 1,
        gameOver: false
    },
    reducers: {
        resetGame: (state, action) => {
            state.resettingGame = action.payload
        },
        setCurrentWorld: (state) => {
            state.currentWorld += 1
        },
        resetCurrentWorld: (state) => {
            state.currentWorld = 1
        },
        setGameOver: (state, action) => {
            state.gameOver = action.payload
        }
    }
})

export const {resetGame, setCurrentWorld, resetCurrentWorld, setGameOver} = gameSlice.actions;
export default gameSlice.reducer