import { createSlice } from "@reduxjs/toolkit";



const roomSlice = createSlice({
    name: 'room',
    initialState: {
        currentRoom: 'map',
        randomRooms: ['treasureRoom', 'healingRoom', 'weaponRoom', 'armorRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom'],
        bossBattle: false,
        inRoom: false,
        resettingRooms: false
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
        goToBossRoom: (state) => {
            state.currentRoom = 'bossRoom'
        },
        goToRandomRoom: (state) => {
                const randomIndex = Math.floor(Math.random() * state.randomRooms.length)
                state.currentRoom = state.randomRooms[randomIndex]
                state.randomRooms = state.randomRooms.filter((_room, index) => index !== randomIndex)
            
        },
        setRandomRooms: (state) => {
            state.randomRooms = ['treasureRoom', 'healingRoom', 'weaponRoom', 'armorRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom']
        },
        setResettingRooms: (state) => {
            state.resettingRooms = !state.resettingRooms
        },
        setInRoom: (state, action) => {
            state.inRoom = action.payload
        },
        setBossBattle: (state, action) => {
            state.bossBattle = action.payload
        }
    }
})

export const {goToEnemyRoom, goToHealingRoom, goToMapRoom, goToTreasureRoom, goToBossRoom, goToRandomRoom, setRandomRooms, setResettingRooms, setInRoom, setBossBattle} = roomSlice.actions;
export default roomSlice.reducer