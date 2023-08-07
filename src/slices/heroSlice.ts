import { createSlice } from "@reduxjs/toolkit";

const heroSlice = createSlice({
    name: 'hero',
    initialState: {
        level: 1,
        experience: 90,
        health: 100,
        maxHealth: 100,
        mana: 100,
        money: 0,
        treasure: [],
        weapon: {
            type: 'weapon',
            name: 'fists',
            damage: 100
        },
        equipment: [

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
        gainMaxHealth: (state) => {
            state.maxHealth += 50
        },
        takeTreasure: (state, action) => {
            state.treasure.push(action.payload)
        },
        takeWeapon: (state, action) => {
            state.equipment.push(action.payload)
        },
        equipWeapon: (state, action) => {
            state.equipment.push(state.weapon)
            state.weapon = action.payload
            state.equipment = state.equipment.filter(item => item.name !== action.payload.name)
        },
        dropWeapon: (state, action) => {
            
        },
        gainExperience: (state, action) => {
            state.experience += action.payload
        },
        resetExperience: (state) => {
            state.experience = 0
        },
        gainLevel: (state) => {
            state.level += 1
        },
        resetHero: (state) => {
            state.level = 1
            state.health = 100
            state.treasure = []
            state.weapon = {
                type: 'weapon',
                name: 'fists',
                damage: 5
            }
            state.equipment = []
        }
    }
})

export const {heroTakeDamage, lowerMana, healToFull, takeTreasure, takeWeapon, equipWeapon, gainExperience, gainLevel, resetExperience, gainMaxHealth} = heroSlice.actions;
export default heroSlice.reducer