import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        resettingGame: false
    },
    reducers: {
        resetGame: (state) => {
            state.resettingGame = !state.resettingGame
        }
    }
})

export const {resetGame} = gameSlice.actions;
export default gameSlice.reducer