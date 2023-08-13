import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        resettingGame: false,
        currentWorld: 1,
        gameOver: false,
        showEquipment: false,
        showBackpack: false,
        showSpells: false,
        showStats: false,
        inAnimation: false,
        afterBattle: false,
        levelingUp: false
    },
    reducers: {
        resetGame: (state, action) => {
            state.resettingGame = action.payload
        },
        setCurrentWorld: (state) => {
            state.currentWorld += 1
        },
        resetCurrentWorld: (state) => {
            state.currentWorld = 1
        },
        setGameOver: (state, action) => {
            state.gameOver = action.payload
        },
        setShowEquipment: (state, action) => {
            state.showEquipment = action.payload
        },
        setShowBackpack: (state, action) => {
            state.showBackpack = action.payload
        },
        setShowSpells: (state, action) => {
            state.showSpells = action.payload
        },
        setInAnimation: (state, action) => {
            state.inAnimation = action.payload
        },
        setAfterBattle: (state, action) => {
            state.afterBattle = action.payload
        },
        setShowStats: (state, action) => {
            state.showStats = action.payload
        },
        setLevelingUp: (state, action) => {
            state.levelingUp = action.payload
        }
    }
})

export const {resetGame, setCurrentWorld, resetCurrentWorld, setGameOver, setShowEquipment, setShowBackpack, setShowSpells, setInAnimation, setAfterBattle, setShowStats, setLevelingUp} = gameSlice.actions;
export default gameSlice.reducer