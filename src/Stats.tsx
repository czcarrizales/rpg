import { useDispatch, useSelector } from 'react-redux'
import './Stats.css'
import { RootState } from './store'
import { setShowStats } from './slices/gameSlice'
import select from '../public/sounds/select.mp3'
import { playSound } from './utilities'

const Stats = () => {
    const dispatch = useDispatch()
    const heroStats = useSelector((state: RootState) => state.hero)
    const goBack = () => {
        dispatch(setShowStats(false))
        playSound(select)
      }
  return (
    <div>
        <div className="stats-container-top">
            <h2>Stats</h2>
            <button className='stats-container-back-button hero-button' onClick={goBack}>Back</button>
        </div>
                  <p>Level: {heroStats.level}</p>
                  <p>Health: {heroStats.health}/{heroStats.maxHealth}</p>
                  <p>Mana: {heroStats.mana}/{heroStats.maxMana}</p>
                  <p>Minimum Attack: {heroStats.minAttack} {heroStats.weapon.damage && `(+${heroStats.weapon.damage})` }</p>
                  <p>Maximum Attack: {heroStats.maxAttack} {heroStats.weapon.damage && `(+${heroStats.weapon.damage})` }</p>
                  <p>Defense: {heroStats.defense} {heroStats.armor.defense && `(+${heroStats.armor.defense})`}</p>
                  
    </div>
  )
}

export default Stats