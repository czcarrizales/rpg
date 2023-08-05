import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
    name: 'battle',
    initialState: {
        playerTurn: true
    },
    reducers: {
        setPlayerTurn: (state, action) => {
            state.playerTurn = action.payload
        },
    }
})

export const {setPlayerTurn} = battleSlice.actions;
export default battleSlice.reducer