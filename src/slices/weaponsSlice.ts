import { createSlice } from "@reduxjs/toolkit";
import { allWeaponsPool } from "../weaponPool";

const weaponsSlice = createSlice({
    name: 'weapons',
    initialState: {
        currentWeaponPool: allWeaponsPool
    },
    reducers: {
        removeFromCurrentWeaponPool: (state, action) => {
            state.currentWeaponPool = state.currentWeaponPool.filter(weapon => weapon.name !== action.payload.name)
        }
    }
})

export const { removeFromCurrentWeaponPool } = weaponsSlice.actions;
export default weaponsSlice.reducer