import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { enemyTakeDamage } from './slices/enemySlice'
import { lowerMana } from './slices/heroSlice'
import './Hero.css'
import { setPlayerTurn } from './slices/battleSlice'

const Hero = ({showEquipment, setShowEquipment, showBackpack, setShowBackpack, inBattle}) => {
  const heroLevel = useSelector(state => state.hero.level)
  const heroExperience = useSelector(state => state.hero.experience)
  const heroMaxHealth = useSelector(state => state.hero.maxHealth)
  const heroHealth = useSelector(state => state.hero.health)
  const heroMana = useSelector(state => state.hero.mana)
  const heroMoney = useSelector(state => state.hero.money)
  const heroTreasure = useSelector(state => state.hero.treasure)
  const heroWeapon = useSelector(state => state.hero.weapon)
  const battleTurn = useSelector(state => state.battle.playerTurn)
  const dispatch = useDispatch()

  const handleAttackEnemy = () => {
    dispatch(enemyTakeDamage(heroWeapon.damage))
    document.documentElement.style.setProperty('--body-bg-color', 'var(--attack-bg-color)');
    setTimeout(() => {
      document.documentElement.style.setProperty('--body-bg-color', '--body-bg-color');
    }, 500);
    dispatch(setPlayerTurn(false))
  }

  const handleFireBall = () => {
    const requiredMana = 10;
    if (heroMana >= requiredMana) {
      dispatch(lowerMana(10))
    } else {

    }
    
  }
  return (
    <div id='hero-container'>
      <h1>Hero</h1>
      <p>Level: {heroLevel}</p>
      <p>XP: {heroExperience}</p>
      <p>Health: {heroHealth}/{heroMaxHealth}</p>
      <p>Mana: {heroMana}</p>
      <p>Weapon: {heroWeapon.name} (dmg: {heroWeapon.damage})</p>
      <p>Money: {heroMoney}</p>

<button onClick={handleAttackEnemy} className='hero-button' disabled={!battleTurn}>Attack</button>
      {heroHealth == 0 && <p>Hero is dead!</p>}
      <button className='hero-button' onClick={() => setShowEquipment(!showEquipment)} disabled={!battleTurn}>Equipment</button>
      <button className='hero-button' onClick={() => setShowBackpack(!showBackpack)} disabled={!battleTurn}>Backpack</button>
    </div>
  )
}

export default Hero