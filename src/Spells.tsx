import { setInAnimation, setShowSpells } from './slices/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Spells.css'
import { lowerMana, raiseHeroHealth } from './slices/heroSlice'
import { RootState } from './store'
import { enemyTakeDamage } from './slices/enemySlice'
import { enemyTakeDamageFlash } from './utilities'
import { setPlayerTurn } from './slices/battleSlice'

const Spells = () => {
    const dispatch = useDispatch()
    const inBattle = useSelector((state: RootState) => state.battle.inBattle)
    const inAnimation = useSelector((state: RootState) => state.game.inAnimation)
    const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
    interface Spell {
        type: string | null;
        name: string | null;
        points: number | null;
        mana: number | null;
      }
      const heroSpells = useSelector((state: RootState) => state.hero.spells)
      const handleAttackEnemy = async (spellDamage: number)  => {
        dispatch(setInAnimation(true))
        dispatch(enemyTakeDamage(spellDamage))
        enemyTakeDamageFlash(dispatch)
        await new Promise((resolve) => setTimeout(resolve, 500))
        dispatch(setPlayerTurn(false))
        dispatch(setInAnimation(false))
      }
      const handleSpellUse = (spell: Spell) => {
        switch (spell.type) {
            case 'HEAL':
                dispatch(raiseHeroHealth(spell.points))
                dispatch(lowerMana(spell.mana))
                break
            case 'DAMAGE':
                handleAttackEnemy(spell.points!)
                dispatch(lowerMana(spell.mana))
                break
            default:
                break; 
        }
      }
    // const healHero = () => {
    //     if (heroMana >= 5 && heroHealth + 5 <= heroMaxHealth) {
    //         dispatch(raiseHeroHealth(20))
    //         dispatch(lowerMana(5))
    //         dispatch(setPlayerTurn(false))
    //     }
    // }
    // const fireball = () => {
    //     if (heroMana >= 10) {
    //         dispatch(enemyTakeDamage(20))
    //         enemyTakeDamageFlash(dispatch)
    //         dispatch(lowerMana(10))
    //         dispatch(setPlayerTurn(false))
    //     }
    // }
    // const lightningBolt = () => {
    //     if (heroMana >= 5) {
    //         dispatch(enemyTakeDamage(10))
    //         enemyTakeDamageFlash(dispatch)
    //         dispatch(lowerMana(5))
    //         dispatch(setPlayerTurn(false))
    //     }
    // }
    return (
        <div id='spell-buttons'>
            <button className='hero-button' onClick={() => dispatch(setShowSpells(false))}>Go Back</button>
            {heroSpells.map(spell => (<button onClick={() => handleSpellUse(spell)} disabled={!battleTurn || !inBattle || inAnimation}>{spell.name}</button>))}
            {/* <button className='hero-button' onClick={() => healHero()} disabled={!battleTurn || !inBattle || inAnimation}>
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
                </button> */}
        </div>

    )
}

export default Spells