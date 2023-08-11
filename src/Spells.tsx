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
    const inBattle = useSelector((state: RootState) => state.battle.inBattle)
    const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
    const healHero = () => {
        if (heroMana >= 20 && heroHealth + 50 <= heroMaxHealth) {
            dispatch(raiseHeroHealth(50))
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
            <button className='hero-button' onClick={() => dispatch(setShowSpells(false))}>Go Back</button>
            <button className='hero-button' onClick={() => healHero()} disabled={!battleTurn || !inBattle}>
                <div>Cure</div>
                <div>(Mana: 50 / Heal: 50)</div>
                </button>
            <button className='hero-button' onClick={() => fireball()} disabled={!battleTurn || !inBattle}>
                <div>Fireball</div>
                <div>(Mana: 20 / Damage: 20)</div>
                </button>
            <button className='hero-button' onClick={() => lightningBolt()} disabled={!battleTurn || !inBattle}>
                <div>Lightning Bolt</div>
                <div>(Mana: 10 / Damage: 10)</div>
                </button>
        </div>

    )
}

export default Spells