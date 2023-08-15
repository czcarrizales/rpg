import { useSelector, useDispatch } from 'react-redux'
import { enemyTakeDamage } from './slices/enemySlice'
import './Hero.css'
import { setPlayerTurn } from './slices/battleSlice'
import { RootState } from './store'
import Equipment from './Equipment'
import Backpack from './Backpack'
import { setInAnimation, setNewEquipment, setShowBackpack, setShowEquipment, setShowSpells, setShowStats } from './slices/gameSlice'
import Spells from './Spells'
import { enemyTakeDamageFlash } from './utilities'
import Stats from './Stats'

const Hero = () => {
  // const heroLevel = useSelector((state: RootState) => state.hero.level)
  const heroExperience = useSelector((state: RootState) => state.hero.experience)
  const heroExperienceToLevelUp = useSelector((state: RootState) => state.hero.experienceToLevelUp)
  const heroMaxHealth = useSelector((state: RootState) => state.hero.maxHealth)
  const heroHealth = useSelector((state: RootState) => state.hero.health)
  const heroMana = useSelector((state: RootState) => state.hero.mana)
  const heroMaxMana = useSelector((state: RootState) => state.hero.maxMana)
  const heroAttack = useSelector((state: RootState) => state.hero.attack)
  const heroMoney = useSelector((state: RootState) => state.hero.money)
  const heroWeapon = useSelector((state: RootState) => state.hero.weapon)
  const heroIsAttacked = useSelector((state: RootState) => state.hero.heroIsAttacked)
  const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
  const inBattle = useSelector((state: RootState) => state.battle.inBattle)
  const inAnimation = useSelector((state: RootState) => state.game.inAnimation)
  const showEquipment = useSelector((state: RootState) => state.game.showEquipment)
  const showBackpack = useSelector((state: RootState) => state.game.showBackpack)
  const showSpells = useSelector((state: RootState) => state.game.showSpells)
  const showStats = useSelector((state: RootState) => state.game.showStats)
  const newEquipment = useSelector((state: RootState) => state.game.newEquipment)
  const dispatch = useDispatch()

  const handleAttackEnemy = async ()  => {
    dispatch(setInAnimation(true))
    dispatch(enemyTakeDamage(heroAttack + heroWeapon.damage!))
    enemyTakeDamageFlash(dispatch)
    await new Promise((resolve) => setTimeout(resolve, 500))
    dispatch(setPlayerTurn(false))
    dispatch(setInAnimation(false))
  }

  return (
    <div className={`hero-container ${heroIsAttacked ? 'hero-attacked' : ''}`}>
              <div id="hero-stats">
                  <div className="stats-grid">
                  <p className='hero-health-stat'>Health: {heroHealth}/{heroMaxHealth}</p>
                <p className='hero-mana-stat'>Mana: {heroMana}/{heroMaxMana}</p>
                <p className='hero-money-stat'>Money: {heroMoney}</p>
                <p className='hero-xp-stat'>XP: {heroExperience} / {heroExperienceToLevelUp}</p>
                  </div>
              </div>
              {
                !showEquipment && !showBackpack && !showSpells && !showStats
                ?
                (
<div id="hero-buttons">
                  <button onClick={handleAttackEnemy} className='hero-button' disabled={!battleTurn || !inBattle || inAnimation}>
                    <p>Attack</p>
                    
                    </button>
                <button className='hero-button' onClick={() => dispatch(setShowSpells(true))} disabled={!battleTurn || inAnimation}>Spells</button>
                <button className={`hero-button ${newEquipment && 'new-equipment'}`} onClick={() => {dispatch(setShowEquipment(true)), dispatch(setNewEquipment(false))}} disabled={!battleTurn || inAnimation}>Equipment</button>
                <button className='hero-button' onClick={() => dispatch(setShowBackpack(true))} disabled={!battleTurn || inAnimation}>Backpack</button>
                <button className='hero-button' onClick={() => dispatch(setShowStats(true))}>Stats</button>
                <button className='hero-button'>Options</button>
                </div>
                )
                :
          showBackpack
          ?
          <Backpack />
          :
          showEquipment
          ?
          <Equipment />
          :
          showSpells
          ?
          <Spells />
          :
          showStats
          ?
          <Stats />
          :
          null
              }
          


    </div>
  )
}

export default Hero