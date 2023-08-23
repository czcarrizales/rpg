import { setInAnimation, setShowSpells } from './slices/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Spells.css'
import { healToFull, lowerMana, raiseHeroHealth, setHeroStatus } from './slices/heroSlice'
import { RootState } from './store'
import { enemyTakeDamage, setEnemyStatus } from './slices/enemySlice'
import { enemyTakeDamageFlash, playBlizzardSound, playErrorSound, playFireSound, playHealSound, playPoisonSound, playProtectSound, playQuakeSound, playSelectSound, playStopSound, playThunderSound } from './utilities'
import { addToBattleDialogue, setPlayerTurn } from './slices/battleSlice'
import { setBlizzardAnimation, setFireAnimation, setHealAnimation, setProtectAnimation, setQuakeAnimation, setStopAnimation, setThunderAnimation } from './slices/animationSlice'

const Spells = () => {
    const dispatch = useDispatch()
    const inBattle = useSelector((state: RootState) => state.battle.inBattle)
    const inAnimation = useSelector((state: RootState) => state.game.inAnimation)
    const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
    const heroStats = useSelector((state: RootState) => state.hero)
    interface Spell {
        type: string | null;
        name: string | null;
        points: number | null;
        mana: number | null;
    }
    const heroSpells = useSelector((state: RootState) => state.hero.spells)

    const handleAttackEnemy = async (spellDamage: number) => {
        dispatch(setInAnimation(true))
        dispatch(enemyTakeDamage(spellDamage))
        enemyTakeDamageFlash(dispatch)
        await new Promise((resolve) => setTimeout(resolve, 500))
        dispatch(setPlayerTurn(false))
        dispatch(setInAnimation(false))
    }

    const handleSpellUse = async (spell: Spell) => {
        switch (spell.type) {
            case 'HEAL':
                if (heroStats.mana - spell.mana! >= 0) {
                    
                    if (heroStats.health + spell.points! >= heroStats.maxHealth) {
                        dispatch(healToFull())
                        dispatch(addToBattleDialogue(`Hero healed to full HP!`))
                    } else {
                        dispatch(raiseHeroHealth(spell.points))
                        dispatch(addToBattleDialogue(`Hero healed for ${spell.points} HP!`))
                    }
                    playHealSound()
                    dispatch(lowerMana(spell.mana))
                    
                    dispatch(setHealAnimation(true))
                    await new Promise((resolve) => setTimeout(resolve, 800))
                    dispatch(setPlayerTurn(false))
                    dispatch(setHealAnimation(false))
                    dispatch(setInAnimation(false))
                } else {
                    playErrorSound()
                }
                break
            case 'DAMAGE':
                if (heroStats.mana - spell.mana! >= 0) {
                    dispatch(setInAnimation(true))
                    if (spell.name === 'Fire') {
                        dispatch(setFireAnimation(true));
                        playFireSound();
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        dispatch(setFireAnimation(false));
                    } else if (spell.name === 'Quake') {
                        dispatch(setQuakeAnimation(true));
                        playQuakeSound();
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        dispatch(setQuakeAnimation(false));
                    } else if (spell.name === 'Thunder') {
                        dispatch(setThunderAnimation(true));
                        playThunderSound();
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        dispatch(setThunderAnimation(false));
                    } else if (spell.name === 'Blizzard') {
                        dispatch(setBlizzardAnimation(true));
                        playBlizzardSound();
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        dispatch(setBlizzardAnimation(false));
                    }
                    handleAttackEnemy(spell.points!)
                    dispatch(lowerMana(spell.mana))
                    dispatch(addToBattleDialogue(`Hero used ${spell.name} for ${spell.points} damage!`))
                } else {
                    playErrorSound()
                }
                break
            case 'ENEMYDEBUFF':
                if (heroStats.mana - spell.mana! >= 0) {
                    if (spell.name === 'Stop') {
                        playStopSound()
                        dispatch(setStopAnimation(true))
                        await new Promise((resolve) => setTimeout(resolve, 1000))
                        dispatch(setStopAnimation(false))
                    } else if (spell.name === 'Poison') {
                        playPoisonSound()
                    }
                    
                    dispatch(lowerMana(spell.mana))
                    dispatch(setEnemyStatus({name: spell.name, points: spell.points}))
                    dispatch(setPlayerTurn(false))
                    dispatch(setInAnimation(false))
                } else {
                    playErrorSound()
                }
                break
            case 'HEROBUFF':
                if (heroStats.mana - spell.mana! >= 0) {
                    if (spell.name === 'Protect') {
                        playProtectSound()
                        dispatch(setProtectAnimation(true))
                        await new Promise((resolve) => setTimeout(resolve, 1000))
                        dispatch(setProtectAnimation(false))
                    }
                    dispatch(lowerMana(spell.mana))
                    dispatch(setHeroStatus({name: spell.name, points: spell.points}))
                    dispatch(setPlayerTurn(false))
                    dispatch(setInAnimation(false))
                } else {
                    playErrorSound()
                }
                break
            default:
                break;
        }
    }

    const goBack = () => {
        dispatch(setShowSpells(false))
        playSelectSound()
    }

    return (
        <div>
            <div className="spells-container-top">
                <h1>Spells</h1>
                <button className='hero-button spells-container-back-button' onClick={goBack}>Back</button>
            </div>
            <div id='spell-buttons'>

                {heroSpells.map(spell => (<button className='hero-button' onClick={() => handleSpellUse(spell)} disabled={!battleTurn || !inBattle || inAnimation}>{spell.name}</button>))}
            </div>
        </div>


    )
}

export default Spells