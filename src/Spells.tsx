import { setShowSpells } from './slices/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Spells.css'
import { lowerMana, raiseHeroHealth } from './slices/heroSlice'
import { RootState } from './store'
import { enemyTakeDamage } from './slices/enemySlice'
import { enemyTakeDamageFlash } from './utilities'
import { setPlayerTurn } from './slices/battleSlice'

const Spells = () => {
    const dispatch = useDispatch()
    const heroMana = useSelector((state: RootState) => state.hero.mana)
    const heroHealth = useSelector((state: RootState) => state.hero.health)
    const heroMaxHealth = useSelector((state: RootState) => state.hero.maxHealth)
    const healHero = () => {
        if (heroMana >= 20 && heroHealth + 20 <= heroMaxHealth) {
            dispatch(raiseHeroHealth(20))
            dispatch(lowerMana(20))
            dispatch(setPlayerTurn(false))
        }
    }
    const fireball = () => {
        if (heroMana >= 20) {
            dispatch(enemyTakeDamage(20))
            enemyTakeDamageFlash(dispatch)
            dispatch(lowerMana(20))
            dispatch(setPlayerTurn(false))
        }
    }
    const lightningBolt = () => {
        if (heroMana >= 10) {
            dispatch(enemyTakeDamage(10))
            enemyTakeDamageFlash(dispatch)
            dispatch(lowerMana(10))
            dispatch(setPlayerTurn(false))
        }
    }
    return (
        <div id='spell-buttons'>
            <button onClick={() => dispatch(setShowSpells(false))}>Go Back</button>
            <button onClick={() => healHero()}>
                <div>Cure</div>
                <div>(Mana: 20 / Heal: 20)</div>
                </button>
            <button onClick={() => fireball()}>
                <div>Fireball</div>
                <div>(Mana: 20 / Damage: 20)</div>
                </button>
            <button onClick={() => lightningBolt()}>
                <div>Lightning Bolt</div>
                <div>(Mana: 10 / Damage: 10)</div>
                </button>
        </div>

    )
}

export default Spells