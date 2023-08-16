import { useDispatch, useSelector } from "react-redux"
import { setAfterBattle, setCurrentWorld, setLevelingUp } from "./slices/gameSlice"
import './AfterBattle.css'
import { useState } from "react"
import { RootState } from "./store"
import { gainAttack, gainDefense, gainMaxHealth, gainMaxMana, healToFull, resetExperience, setExperienceToLevelUp } from "./slices/heroSlice"

const AfterBattle = (props: any) => {
  const dispatch = useDispatch()
  const [levelUpPoints, setLevelUpPoints] = useState(10)
  const [healthPoints, setHealthPoints] = useState(0)
  const [manaPoints, setManaPoints] = useState(0)
  const [attackPoints, setAttackPoints] = useState(0)
  const [defensePoints, setDefensePoints] = useState(0)
  const heroStats = useSelector((state: RootState) => state.hero)
  const levelingUp = useSelector((state: RootState) => state.game.levelingUp)
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom)

  const handlePointsChange = (type: any, value: any) => {
    if ((levelUpPoints > 0 && levelUpPoints <= 10) || value < 0) {
      switch (type) {
        case 'health':
          const newHealthPoints = healthPoints + value
          if (newHealthPoints >= 0) {
            setHealthPoints(prevPoints => prevPoints + value);
            setLevelUpPoints(prevLevelUpPoints => prevLevelUpPoints - value)
          }
          
          break;
        case 'mana':
          const newManaPoints = manaPoints + value
          if (newManaPoints >= 0) {
            setManaPoints(prevPoints => prevPoints + value);
            setLevelUpPoints(prevLevelUpPoints => prevLevelUpPoints - value)
          }
          
          break;
        case 'attack':
          const newAttackPoints = attackPoints + value
          if (newAttackPoints >= 0) {
            setAttackPoints(prevPoints => prevPoints + value);
            setLevelUpPoints(prevLevelUpPoints => prevLevelUpPoints - value)
          }
          
          break;
        case 'defense':
          const newDefensePoints = defensePoints + value
          if (newDefensePoints >= 0) {
            setDefensePoints(prevPoints => prevPoints + value);
            setLevelUpPoints(prevLevelUpPoints => prevLevelUpPoints - value)
          }
          break;
        default:
          break;
      }
    }
  };

  const handleLevelUp = (health: number, mana: number, attack: number, defense: number) => {
    if (currentRoom === 'bossRoom') {
      dispatch(setCurrentWorld())
    }
    if (levelingUp) {
      dispatch(gainMaxHealth(health))
      dispatch(gainMaxMana(mana))
      dispatch(gainAttack(attack))
      dispatch(gainDefense(defense))
      dispatch(setAfterBattle(false))
      dispatch(setLevelingUp(false))
      dispatch(healToFull())
      dispatch(resetExperience())
      dispatch(setExperienceToLevelUp(heroStats.experienceToLevelUp + 10))
    } else {
      dispatch(setAfterBattle(false))
    }
    
  }

  return (
    <div className="after-battle-container">
      <p>{props.name} defeated!</p>
      <p>XP Gained: {props.xp}</p>
      <p>Money Gained: {props.money}</p>
      {
        levelingUp
        &&
        <div id="level-up-container">
          {/* <h2>Level Up!</h2>
          <h3>Level Up Points Left: {levelUpPoints}</h3> */}
          <div className="level-up-stat">
            <p className="level-up-name">Max Health: +{healthPoints}</p>
            <div className="level-up-buttons">
            <button onClick={() => handlePointsChange('health', -1)}>-</button>
            <button onClick={() => handlePointsChange('health', 1)}>+</button>
            </div>
            
          </div>
          <div className="level-up-stat">
            <p className="level-up-name">Max Mana: +{manaPoints}</p>
            <div className="level-up-buttons">
            <button onClick={() => handlePointsChange('mana', -1)}>-</button>
            <button onClick={() => handlePointsChange('mana', 1)}>+</button>
            </div>
            
          </div>
          <div className="level-up-stat">
            <p className="level-up-name">Attack: +{attackPoints}</p>
            <div className="level-up-buttons">
            <button onClick={() => handlePointsChange('attack', -1)}>-</button>
            <button onClick={() => handlePointsChange('attack', 1)}>+</button>
            </div>
            
          </div>
          <div className="level-up-stat">
            <p className="level-up-name">Defense: +{defensePoints}</p>
            <div className="level-up-buttons">
            <button onClick={() => handlePointsChange('defense', -1)}>-</button>
            <button onClick={() => handlePointsChange('defense', 1)}>+</button>
            </div>
            
          </div>
        </div>
      }
      <button disabled={levelingUp && levelUpPoints > 0} onClick={() => handleLevelUp(healthPoints, manaPoints, attackPoints, defensePoints)} className="continue-button">Continue</button>
    </div>
  )
}

export default AfterBattle