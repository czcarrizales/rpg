import { setInAnimation, setShowSpells } from './slices/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Spells.css'
import { lowerMana, raiseHeroHealth } from './slices/heroSlice'
import { RootState } from './store'
import { enemyTakeDamage } from './slices/enemySlice'
import { enemyTakeDamageFlash } from './utilities'
import { addToBattleDialogue, setPlayerTurn } from './slices/battleSlice'

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
                dispatch(addToBattleDialogue(`Hero healed for ${spell.points} HP!`))
                break
            case 'DAMAGE':
                handleAttackEnemy(spell.points!)
                dispatch(lowerMana(spell.mana))
                dispatch(addToBattleDialogue(`Hero used ${spell.name} for ${spell.points} damage!`))
                break
            default:
                break; 
        }
      }
  
    return (
        <div>
            <div className="spells-container-top">
                <h1>Spells</h1>
            <button className='hero-button spells-container-back-button' onClick={() => dispatch(setShowSpells(false))}>Back</button>
            </div>
<div id='spell-buttons'>
            
            {heroSpells.map(spell => (<button className='hero-button' onClick={() => handleSpellUse(spell)} disabled={!battleTurn || !inBattle || inAnimation}>{spell.name}</button>))}
        </div>
        </div>
        

    )
}

export default Spells