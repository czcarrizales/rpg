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
    const inAnimation = useSelector((state: RootState) => state.game.inAnimation)
    const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
    const healHero = () => {
        if (heroMana >= 5 && heroHealth + 5 <= heroMaxHealth) {
            dispatch(raiseHeroHealth(20))
            dispatch(lowerMana(5))
            dispatch(setPlayerTurn(false))
        }
    }
    const fireball = () => {
        if (heroMana >= 10) {
            dispatch(enemyTakeDamage(20))
            enemyTakeDamageFlash(dispatch)
            dispatch(lowerMana(10))
            dispatch(setPlayerTurn(false))
        }
    }
    const lightningBolt = () => {
        if (heroMana >= 5) {
            dispatch(enemyTakeDamage(10))
            enemyTakeDamageFlash(dispatch)
            dispatch(lowerMana(5))
            dispatch(setPlayerTurn(false))
        }
    }
    return (
        <div id='spell-buttons'>
            <button className='hero-button' onClick={() => dispatch(setShowSpells(false))}>Go Back</button>
            <button className='hero-button' onClick={() => healHero()} disabled={!battleTurn || !inBattle || inAnimation}>
                <div>Cure</div>
                <div>(Mana: 5 / Heal: 20)</div>
                </button>
            <button className='hero-button' onClick={() => fireball()} disabled={!battleTurn || !inBattle || inAnimation}>
                <div>Fireball</div>
                <div>(Mana: 10 / Damage: 25)</div>
                </button>
            <button className='hero-button' onClick={() => lightningBolt()} disabled={!battleTurn || !inBattle || inAnimation}>
                <div>Lightning Bolt</div>
                <div>(Mana: 5 / Damage: 15)</div>
                </button>
        </div>

    )
}

export default Spells