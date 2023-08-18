import { useSelector, useDispatch } from 'react-redux'
import { enemyTakeDamage } from './slices/enemySlice'
import './Hero.css'
import { addToBattleDialogue, setPlayerTurn } from './slices/battleSlice'
import { RootState } from './store'
import Equipment from './Equipment'
import Backpack from './Backpack'
import { setInAnimation, setNewEquipment, setShowBackpack, setShowEquipment, setShowOptions, setShowSpells, setShowStats } from './slices/gameSlice'
import Spells from './Spells'
import { enemyTakeDamageFlash, playSound } from './utilities'
import Stats from './Stats'
import Options from './Options'
import { selectSound } from './audioUtils'

const Hero = () => {
  // const heroLevel = useSelector((state: RootState) => state.hero.level)
  const heroExperience = useSelector((state: RootState) => state.hero.experience)
  const heroExperienceToLevelUp = useSelector((state: RootState) => state.hero.experienceToLevelUp)
  const heroMaxHealth = useSelector((state: RootState) => state.hero.maxHealth)
  const heroHealth = useSelector((state: RootState) => state.hero.health)
  const heroMana = useSelector((state: RootState) => state.hero.mana)
  const heroMaxMana = useSelector((state: RootState) => state.hero.maxMana)
  const heroMinAttack = useSelector((state: RootState) => state.hero.minAttack)
  const heroMaxAttack = useSelector((state: RootState) => state.hero.maxAttack)
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
  const showOptions = useSelector((state: RootState) => state.game.showOptions)
  const newEquipment = useSelector((state: RootState) => state.game.newEquipment)
  const playerAttackSound = useSelector((state: RootState) => state.sounds.playerAttackSound)
  const dispatch = useDispatch()

  const handleAttackEnemy = async ()  => {
    const randomHeroDamage = (Math.floor(Math.random() * (heroMaxAttack - heroMinAttack + 1)) + heroMinAttack) + heroWeapon.damage!
    const audio = new Audio(playerAttackSound)
    audio.volume = 0.3
    audio.play()
    dispatch(setInAnimation(true))
    dispatch(enemyTakeDamage(randomHeroDamage))
    dispatch(addToBattleDialogue(`Hero attacked for ${randomHeroDamage} damage!`))
    enemyTakeDamageFlash(dispatch)
    await new Promise((resolve) => setTimeout(resolve, 500))
    dispatch(setPlayerTurn(false))
    dispatch(setInAnimation(false))
  }

  const handleGoToSpells = () => {
    dispatch(setShowSpells(true))
    playSound(selectSound)
  }

  const handleGoToEquipment = () => {
    dispatch(setShowEquipment(true))
    dispatch(setNewEquipment(false))
    playSound(selectSound)
  }

  const handleGoToBackpack = () => {
    dispatch(setShowBackpack(true))
    playSound(selectSound)
  }

  const handleGoToStats = () => {
    dispatch(setShowStats(true))
    playSound(selectSound)
  }

  const handleGoToOptions = () => {
    dispatch(setShowOptions(true))
    playSound(selectSound)
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
                !showEquipment && !showBackpack && !showSpells && !showStats && !showOptions
                ?
                (
<div id="hero-buttons">
                  <button onClick={handleAttackEnemy} className='hero-button' disabled={!battleTurn || !inBattle || inAnimation}>
                    <p>Attack</p>
                    
                    </button>
                <button className='hero-button' onClick={handleGoToSpells} disabled={!battleTurn || inAnimation}>Spells</button>
                <button className={`hero-button ${newEquipment && 'new-equipment'}`} onClick={handleGoToEquipment} disabled={!battleTurn || inAnimation}>Equipment</button>
                <button className='hero-button' onClick={handleGoToBackpack} disabled={!battleTurn || inAnimation}>Backpack</button>
                <button className='hero-button' onClick={handleGoToStats}>Stats</button>
                <button className='hero-button' onClick={handleGoToOptions}>Options</button>
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
          showOptions
          ?
          <Options />
          :
          null
              }
          


    </div>
  )
}

export default Hero