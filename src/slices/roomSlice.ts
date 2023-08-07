import { createSlice } from "@reduxjs/toolkit";

const roomTypes = ['enemyRoom', 'treasureRoom', 'healingRoom', 'weaponRoom']

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        currentRoom: 'map',
        randomRooms: ['treasureRoom', 'healingRoom', 'weaponRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom'],
        bossBattle: false,
        inRoom: false
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
                state.randomRooms = state.randomRooms.filter((room, index) => index !== randomIndex)
            
        },
        setRandomRooms: (state) => {
            // for (let i = 0; i < 9; i++) {
            //     const randomIndex = Math.floor(Math.random() * roomTypes.length)
            //     state.randomRooms.push(roomTypes[randomIndex])
            // }
        },
        setInRoom: (state) => {
            state.inRoom = !state.inRoom
        },
        setBossBattle: (state) => {
            state.bossBattle = !state.bossBattle
        }
    }
})

export const {goToEnemyRoom, goToHealingRoom, goToMapRoom, goToTreasureRoom, goToBossRoom, goToRandomRoom, setRandomRooms, setInRoom, setBossBattle} = roomSlice.actions;
export default roomSlice.reducer