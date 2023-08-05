import {configureStore} from '@reduxjs/toolkit'
import heroReducer from './slices/heroSlice'
import enemyReducer from './slices/enemySlice'
import roomReducer from './slices/roomSlice'
import battleReducer from './slices/battleSlice'

const store = configureStore({
    reducer: {
        hero: heroReducer,
        enemy: enemyReducer,
        room: roomReducer,
        battle: battleReducer
    }
})

export default store;