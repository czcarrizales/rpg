import { resetCurrentWorld, resetGame, setGameOver, setNewEquipment } from './slices/gameSlice'
import { useDispatch } from 'react-redux'
import { goToMapRoom, setBossBattle, setInRoom, setRandomRooms, setResettingRooms } from './slices/roomSlice'
import { setInBattle } from './slices/battleSlice'
import { resetHero } from './slices/heroSlice'
import './GameOver.css'

export const GameOver = () => {
    const dispatch = useDispatch()

    const handleNewGame = () => {
        dispatch(setGameOver(false))
        dispatch(setInBattle(false))
        dispatch(goToMapRoom())
        dispatch(setRandomRooms())
        dispatch(setInRoom(false))
        dispatch(setResettingRooms(true))
        dispatch(setBossBattle(false))
        dispatch(resetHero())
        dispatch(resetGame(true))
        dispatch(setNewEquipment(false))
        dispatch(resetCurrentWorld())
        // setTimeout(() => {
        //     dispatch(resetGame(true))
        //     setTimeout(() => {
        //       dispatch(resetGame(false))
        //     }, 100);
        //     dispatch(setResettingRooms())
        // }, 1000);
    }

  return (
    <div id='game-over-container'>
        <h1>Game Over!</h1>
        <button className='take-button' onClick={handleNewGame}>New Game</button>
    </div>
  )
}
