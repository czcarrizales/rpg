import { useDispatch, useSelector } from 'react-redux'
import { healToFull, setMana } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './HealingRoom.css'
import { playHealSound, playSelectSound } from './utilities'
import { RootState } from './store'

const HealingRoom = () => {
    const dispatch = useDispatch()
    const heroStats = useSelector((state: RootState) => state.hero)
    const handleHealHeroToFull = () => {
        dispatch(healToFull())
        dispatch(setMana(heroStats.maxMana))
        dispatch(goToMapRoom())
        dispatch(setInRoom(false))
        playSelectSound()
        playHealSound()
    }
  return (
    <div id='healing-room-container'>
        <h1 className='healing-room-title'>Healing Fountain</h1>
        <button className='take-button healing-room-button' onClick={handleHealHeroToFull}>Heal to full!</button>
    </div>
  )
}

export default HealingRoom