import React from 'react'
import { resetGame, setGameOver } from './slices/gameSlice'
import { useDispatch } from 'react-redux'
import { goToMapRoom, setBossBattle, setInRoom, setRandomRooms, setResettingRooms } from './slices/roomSlice'
import { setInBattle } from './slices/battleSlice'
import { resetHero } from './slices/heroSlice'

export const GameOver = () => {
    const dispatch = useDispatch()

    const handleNewGame = () => {
        dispatch(setGameOver(false))
        dispatch(setInBattle(false))
        dispatch(goToMapRoom())
        dispatch(setRandomRooms())
        dispatch(setInRoom(false))
        dispatch(setResettingRooms())
        dispatch(setBossBattle(false))
        dispatch(resetHero())
        setTimeout(() => {
            dispatch(resetGame(true))
            dispatch(setResettingRooms())
        }, 1000);
    }

  return (
    <div>
        <h1>Game Over!</h1>
        <button onClick={handleNewGame}>New Game</button>
    </div>
  )
}
