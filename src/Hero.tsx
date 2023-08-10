import { useSelector, useDispatch } from 'react-redux'
import { enemyTakeDamage, setEnemyIsAttacked } from './slices/enemySlice'
import './Hero.css'
import { setPlayerTurn } from './slices/battleSlice'
import { RootState } from './store'
import Equipment from './Equipment'
import Backpack from './Backpack'
import { setShowBackpack, setShowEquipment, setShowSpells } from './slices/gameSlice'
import Spells from './Spells'
import { enemyTakeDamageFlash } from './utilities'

const Hero = () => {
  // const heroLevel = useSelector((state: RootState) => state.hero.level)
  // const heroExperience = useSelector((state: RootState) => state.hero.experience)
  const heroMaxHealth = useSelector((state: RootState) => state.hero.maxHealth)
  const heroHealth = useSelector((state: RootState) => state.hero.health)
  const heroMana = useSelector((state: RootState) => state.hero.mana)
  // const heroMoney = useSelector((state: RootState) => state.hero.money)
  const heroWeapon = useSelector((state: RootState) => state.hero.weapon)
  // const heroArmor = useSelector((state: RootState) => state.hero.armor)
  const heroIsAttacked = useSelector((state: RootState) => state.hero.heroIsAttacked)
  const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
  const inBattle = useSelector((state: RootState) => state.battle.inBattle)
  // const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
  const showEquipment = useSelector((state: RootState) => state.game.showEquipment)
  const showBackpack = useSelector((state: RootState) => state.game.showBackpack)
  const showSpells = useSelector((state: RootState) => state.game.showSpells)
  const dispatch = useDispatch()

  const handleAttackEnemy = () => {
    dispatch(enemyTakeDamage(heroWeapon.damage!))
    enemyTakeDamageFlash(dispatch)
    dispatch(setPlayerTurn(false))
  }

  return (
    <div className={`hero-container ${heroIsAttacked ? 'hero-attacked' : ''}`}>
      {
        !showEquipment && !showBackpack
          ?
          (
            <div className='hero-content'>
              <div id="hero-stats">
                {/* <h1>Hero</h1>
      <p>Current World: {currentWorld}</p>
      <p>Level: {heroLevel}</p>
      <p>XP: {heroExperience}</p> */}
                <p className='hero-health-stat'>Health: {heroHealth}/{heroMaxHealth}</p>
                <p className='hero-mana-stat'>Mana: {heroMana}</p>
                {/* <p>Weapon: {heroWeapon.name} (dmg: {heroWeapon.damage})</p>
      <p>Armor: {heroArmor.name ? heroArmor.name : 'None'} (defense: {heroArmor.defense ? heroArmor.defense : 0})</p>
      <p>Money: {heroMoney}</p> */}
              </div>

              {
                !showSpells
                ?
                <div id="hero-buttons">
                  <button onClick={handleAttackEnemy} className='hero-button' disabled={!battleTurn || !inBattle}>Attack</button>
                <button className='hero-button' onClick={() => dispatch(setShowSpells(true))}>Spells</button>
                <button className='hero-button' onClick={() => dispatch(setShowEquipment(true))} disabled={!battleTurn}>Equipment</button>
                <button className='hero-button' onClick={() => dispatch(setShowBackpack(true))} disabled={!battleTurn}>Backpack</button>
                </div>
                :
                  <Spells/>
                
              }
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
          null
      }


    </div>
  )
}

export default Hero