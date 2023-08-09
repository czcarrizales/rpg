import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { enemyTakeDamage } from './slices/enemySlice'
import { lowerMana } from './slices/heroSlice'
import './Hero.css'
import { setPlayerTurn } from './slices/battleSlice'

const Hero = ({ showEquipment, setShowEquipment, showBackpack, setShowBackpack }) => {
  const heroLevel = useSelector(state => state.hero.level)
  const heroExperience = useSelector(state => state.hero.experience)
  const heroMaxHealth = useSelector(state => state.hero.maxHealth)
  const heroHealth = useSelector(state => state.hero.health)
  const heroMana = useSelector(state => state.hero.mana)
  const heroMoney = useSelector(state => state.hero.money)
  const heroTreasure = useSelector(state => state.hero.treasure)
  const heroWeapon = useSelector(state => state.hero.weapon)
  const heroArmor = useSelector(state => state.hero.armor)
  const battleTurn = useSelector(state => state.battle.playerTurn)
  const inBattle = useSelector(state => state.battle.inBattle)
  const currentWorld = useSelector(state => state.game.currentWorld)
  const dispatch = useDispatch()

  const handleAttackEnemy = () => {
    dispatch(enemyTakeDamage(heroWeapon.damage))
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
      <p>Current World: {currentWorld}</p>
      <p>Level: {heroLevel}</p>
      <p>XP: {heroExperience}</p>
      <p>Health: {heroHealth}/{heroMaxHealth}</p>
      <p>Mana: {heroMana}</p>
      <p>Weapon: {heroWeapon.name} (dmg: {heroWeapon.damage})</p>
      <p>Armor: {heroArmor.name ? heroArmor.name : 'None'} (defense: {heroArmor.defense ? heroArmor.defense : 0})</p>
      <p>Money: {heroMoney}</p>
      <div id="hero-buttons">
      <button onClick={handleAttackEnemy} className='hero-button' disabled={!battleTurn || !inBattle}>Attack</button>
      {heroHealth == 0 && <p>Hero is dead!</p>}
      <button className='hero-button' onClick={() => setShowEquipment(!showEquipment)} disabled={!battleTurn}>Equipment</button>
      <button className='hero-button' onClick={() => setShowBackpack(!showBackpack)} disabled={!battleTurn}>Backpack</button>
      </div>
      
    </div>
  )
}

export default Hero