import { useDispatch, useSelector } from 'react-redux'
import './Stats.css'
import { RootState } from './store'
import { setShowStats } from './slices/gameSlice'

const Stats = () => {
    const dispatch = useDispatch()
    const heroStats = useSelector((state: RootState) => state.hero)
  return (
    <div>
        <>
                  <h2>Stats</h2>
                  <p>Health: {heroStats.health}/{heroStats.maxHealth}</p>
                  <p>Mana: {heroStats.mana}/{heroStats.maxMana}</p>
                  <p>Attack: {heroStats.attack} {heroStats.weapon.damage && `(+${heroStats.weapon.damage})` }</p>
                  <p>Defense: {heroStats.defense} {heroStats.armor.defense && `(+${heroStats.armor.defense})`}</p>
                  <button onClick={() => dispatch(setShowStats(false))}>Go back</button>
                  </>
    </div>
  )
}

export default Stats