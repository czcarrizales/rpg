import { createSlice } from "@reduxjs/toolkit";

const enemySlice = createSlice({
    name: 'enemy',
    initialState: {
        health: 100,
        armor: 50
    },
    reducers: {
        enemyTakeDamage: (state, action) => {
            state.health -= action.payload
        },
        enemyReset: (state) => {
            state.health = 100
        }
    }
})

export const {enemyTakeDamage, enemyReset} = enemySlice.actions;
export default enemySlice.reducer