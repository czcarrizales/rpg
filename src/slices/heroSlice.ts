import { createSlice } from "@reduxjs/toolkit";

const heroSlice = createSlice({
    name: 'hero',
    initialState: {
        level: 1,
        experience: 0,
        health: 100,
        maxHealth: 200,
        mana: 100,
        treasure: [],
        weapon: {
            type: 'weapon',
            name: 'fists',
            damage: 5
        },
        equipment: [
            {
                type: 'weapon',
                name: 'sword',
                damage: 10
            },
            {
                type: 'weapon',
                name: 'hammer',
                damage: 15
            }
        ]
    },
    reducers: {
        heroTakeDamage: (state, action) => {
            state.health -= action.payload
        },
        lowerMana: (state, action) => {
            state.mana -= action.payload
        },
        healToFull: (state) => {
            state.health = state.maxHealth
        },
        takeTreasure: (state, action) => {
            state.treasure.push(action.payload)
        },
        takeWeapon: (state, action) => {
            state.equipment.push(action.payload)
        },
        equipWeapon: (state, action) => {
            state.weapon = action.payload
        },
        dropWeapon: (state, action) => {
            
        },
        gainExperience: (state, action) => {
            state.experience += action.payload
        }
    }
})

export const {heroTakeDamage, lowerMana, healToFull, takeTreasure, takeWeapon, equipWeapon, gainExperience} = heroSlice.actions;
export default heroSlice.reducer