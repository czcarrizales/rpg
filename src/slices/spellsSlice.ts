import { createSlice } from "@reduxjs/toolkit";
import { allSpellsPool } from "../spellPool";

const spellsSlice = createSlice({
    name: 'spells',
    initialState: {
        currentSpellPool: allSpellsPool
    },
    reducers: {
        removeFromCurrentSpellPool: (state, action) => {
            state.currentSpellPool = state.currentSpellPool.filter(spell => spell.name !== action.payload.name)
        }
    }
})

export const { removeFromCurrentSpellPool } = spellsSlice.actions;
export default spellsSlice.reducer