import { useSelector, useDispatch } from 'react-redux'
import { enemyTakeDamage } from './slices/enemySlice'
import './Hero.css'
import { setPlayerTurn } from './slices/battleSlice'
import { RootState } from './store'
import Equipment from './Equipment'
import Backpack from './Backpack'
import { setInAnimation, setShowBackpack, setShowEquipment, setShowSpells, setShowStats } from './slices/gameSlice'
import Spells from './Spells'
import { enemyTakeDamageFlash } from './utilities'

const Hero = () => {
  // const heroLevel = useSelector((state: RootState) => state.hero.level)
  const heroExperience = useSelector((state: RootState) => state.hero.experience)
  const heroExperienceToLevelUp = useSelector((state: RootState) => state.hero.experienceToLevelUp)
  const heroMaxHealth = useSelector((state: RootState) => state.hero.maxHealth)
  const heroHealth = useSelector((state: RootState) => state.hero.health)
  const heroMana = useSelector((state: RootState) => state.hero.mana)
  const heroAttack = useSelector((state: RootState) => state.hero.attack)
  const heroDefense = useSelector((state: RootState) => state.hero.defense)
  const heroWeapon = useSelector((state: RootState) => state.hero.weapon)
  const heroArmor = useSelector((state: RootState) => state.hero.armor)
  const heroIsAttacked = useSelector((state: RootState) => state.hero.heroIsAttacked)
  const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
  const inBattle = useSelector((state: RootState) => state.battle.inBattle)
  const showEquipment = useSelector((state: RootState) => state.game.showEquipment)
  const showBackpack = useSelector((state: RootState) => state.game.showBackpack)
  const showSpells = useSelector((state: RootState) => state.game.showSpells)
  const showStats = useSelector((state: RootState) => state.game.showStats)
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
      {
        !showEquipment && !showBackpack
          ?
          (
            <div className='hero-content'>
              <div id="hero-stats">
                {
                  showStats
                  ?
                  <>
                  <h2>Stats</h2>
                  <p>Health: {heroHealth}/{heroMaxHealth}</p>
                  <p>Mana: {heroMana}</p>
                  <p>Attack: {heroAttack} {heroWeapon.damage && `(+${heroWeapon.damage})` }</p>
                  <p>Defense: {heroDefense} {heroArmor.defense && `(+${heroArmor.defense})`}</p>
                  <button onClick={() => dispatch(setShowStats(false))}>Go back</button>
                  </>
                  :
                  <>
                  <p>xp: {heroExperience} / {heroExperienceToLevelUp}</p>
                <p className='hero-health-stat'>Health: {heroHealth}/{heroMaxHealth}</p>
                <p className='hero-mana-stat'>Mana: {heroMana}</p>
                <button className='hero-button stats-button' onClick={() => dispatch(setShowStats(true))}>Stats</button>
                </>
                }
                
              </div>

              {
                !showSpells
                ?
                <div id="hero-buttons">
                  <button onClick={handleAttackEnemy} className='hero-button' disabled={!battleTurn || !inBattle}>
                    <p>Attack</p>
                    <p>({heroAttack + heroWeapon.damage!} dmg)</p>
                    </button>
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