import { useDispatch } from 'react-redux'
import { healToFull } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './HealingRoom.css'

const HealingRoom = () => {
    const dispatch = useDispatch()
    const handleHealHeroToFull = () => {
        dispatch(healToFull())
        dispatch(goToMapRoom())
        dispatch(setInRoom(false))
    }
  return (
    <div id='healing-room-container'>
        <h1 className='healing-room-title'>Healing Fountain</h1>
        <button className='take-button healing-room-button' onClick={handleHealHeroToFull}>Heal to full!</button>
    </div>
  )
}

export default HealingRoom