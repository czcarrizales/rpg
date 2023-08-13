import { useDispatch, useSelector } from "react-redux"
import { setAfterBattle, setLevelingUp } from "./slices/gameSlice"
import './AfterBattle.css'
import { useState } from "react"
import { RootState } from "./store"
import { gainAttack, gainDefense, gainMaxHealth, gainMaxMana } from "./slices/heroSlice"

const AfterBattle = (props: any) => {
  const dispatch = useDispatch()
  const [levelUpPoints, setLevelUpPoints] = useState(10)
  const [healthPoints, setHealthPoints] = useState(0)
  const [manaPoints, setManaPoints] = useState(0)
  const [attackPoints, setAttackPoints] = useState(0)
  const [defensePoints, setDefensePoints] = useState(0)
  const levelingUp = useSelector((state: RootState) => state.game.levelingUp)

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
    if (levelingUp) {
      dispatch(gainMaxHealth(health))
      dispatch(gainMaxMana(mana))
      dispatch(gainAttack(attack))
      dispatch(gainDefense(defense))
      dispatch(setAfterBattle(false))
      dispatch(setLevelingUp(false))
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
        <>
          <h2>Level Up!</h2>
          <h3>Level Up Points Left: {levelUpPoints}</h3>
          <div className="level-up-stat">
            <p>Health: +{healthPoints}</p>
            <button onClick={() => handlePointsChange('health', -1)}>-</button>
            <button onClick={() => handlePointsChange('health', 1)}>+</button>
          </div>
          <div className="level-up-stat">
            <p>Mana: +{manaPoints}</p>
            <button onClick={() => handlePointsChange('mana', -1)}>-</button>
            <button onClick={() => handlePointsChange('mana', 1)}>+</button>
          </div>
          <div className="level-up-stat">
            <p>Attack: +{attackPoints}</p>
            <button onClick={() => handlePointsChange('attack', -1)}>-</button>
            <button onClick={() => handlePointsChange('attack', 1)}>+</button>
          </div>
          <div className="level-up-stat">
            <p>Defense: +{defensePoints}</p>
            <button onClick={() => handlePointsChange('defense', -1)}>-</button>
            <button onClick={() => handlePointsChange('defense', 1)}>+</button>
          </div>
        </>
      }
      <button disabled={levelingUp && levelUpPoints > 0} onClick={() => handleLevelUp(healthPoints, manaPoints, attackPoints, defensePoints)}>Continue</button>
    </div>
  )
}

export default AfterBattle