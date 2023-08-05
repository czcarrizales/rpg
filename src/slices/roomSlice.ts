import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        currentRoom: 'map'
    },
    reducers: {
        goToEnemyRoom: (state) => {
            state.currentRoom = 'enemy'
        },
        goToTreasureRoom: (state) => {
            state.currentRoom = 'treasure'
        },
        goToHealingRoom: (state) => {
            state.currentRoom = 'healingRoom'
        },
        goToMapRoom: (state) => {
            state.currentRoom = 'map'
        },
        goToRandomRoom: (state) => {
            const rooms = ['enemy', 'treasure', 'healingRoom', 'weaponRoom']
            const randomIndex = Math.floor(Math.random() * rooms.length)
            state.currentRoom = rooms[randomIndex]
        }
    }
})

export const {goToEnemyRoom, goToHealingRoom, goToMapRoom, goToTreasureRoom, goToRandomRoom} = roomSlice.actions;
export default roomSlice.reducer