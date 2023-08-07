import {configureStore} from '@reduxjs/toolkit'
import heroReducer from './slices/heroSlice'
import enemyReducer from './slices/enemySlice'
import roomReducer from './slices/roomSlice'
import battleReducer from './slices/battleSlice'
import gameReducer from './slices/gameSlice'

const store = configureStore({
    reducer: {
        hero: heroReducer,
        enemy: enemyReducer,
        room: roomReducer,
        battle: battleReducer,
        game: gameReducer
    }
})

export default store;