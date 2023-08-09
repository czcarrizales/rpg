import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
    name: 'battle',
    initialState: {
        playerTurn: true,
        inBattle: false
    },
    reducers: {
        setPlayerTurn: (state, action) => {
            state.playerTurn = action.payload
        },
        setInBattle: (state, action) => {
            state.inBattle = action.payload;
        }
    }
})

export const {setPlayerTurn, setInBattle} = battleSlice.actions;
export default battleSlice.reducer