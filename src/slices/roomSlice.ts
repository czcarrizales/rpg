import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateCurrentRoomState = createAsyncThunk('room/updateCurrentRoomState', async (newState) => {
    return newState
})



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
        goToShopRoom: (state) => {
            state.currentRoom = 'shopRoom'
        },
        goToRandomRoom: (state) => {
                const randomIndex = Math.floor(Math.random() * state.randomRooms.length)
                state.currentRoom = state.randomRooms[randomIndex]
                state.randomRooms = state.randomRooms.filter((_room, index) => index !== randomIndex)
        },
        setRandomRooms: (state) => {
            state.randomRooms = ['treasureRoom', 'spellRoom', 'weaponRoom', 'armorRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom', 'enemyRoom']
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
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(updateCurrentRoomState.fulfilled, (state) => {
    //             const randomIndex = Math.floor(Math.random() * state.randomRooms.length)
    //             state.currentRoom = state.randomRooms[randomIndex]
    //             state.randomRooms = state.randomRooms.filter((_room, index) => index !== randomIndex)  
    //             if (state.currentRoom == 'enemyRoom') {
    //                 dispatch(setRandomEncounterAnimation(true))
    //                 console.log('we console.log and now we wait for two seconds before doing anything else, like dispatching')
    //                 setTimeout(resolve, 400)
    //               } else {
    //                 resolve(undefined)
    //               }  
    //     })
    // }
})

export const {goToEnemyRoom, goToHealingRoom, goToMapRoom, goToTreasureRoom, goToBossRoom, goToShopRoom, goToRandomRoom, setRandomRooms, setResettingRooms, setInRoom, setBossBattle} = roomSlice.actions;
export default roomSlice.reducer