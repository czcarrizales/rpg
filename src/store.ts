import {configureStore} from '@reduxjs/toolkit'
import heroReducer from './slices/heroSlice'
import enemyReducer from './slices/enemySlice'
import roomReducer from './slices/roomSlice'
import battleReducer from './slices/battleSlice'
import gameReducer from './slices/gameSlice'
import shopReducer from './slices/shopSlice'
import soundsReducer from './slices/soundsSlice'

const store = configureStore({
    reducer: {
        hero: heroReducer,
        enemy: enemyReducer,
        room: roomReducer,
        battle: battleReducer,
        game: gameReducer,
        shop: shopReducer,
        sounds: soundsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;