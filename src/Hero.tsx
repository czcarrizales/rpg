import { useSelector, useDispatch } from 'react-redux'
import { enemyTakeDamage, setEnemyIsAttacked } from './slices/enemySlice'
import './Hero.css'
import { setPlayerTurn } from './slices/battleSlice'
import { RootState } from './store'

interface HeroProps {
  showEquipment: boolean;
  setShowEquipment: React.Dispatch<React.SetStateAction<boolean>>;
  showBackpack: boolean;
  setShowBackpack: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero: React.FC<HeroProps> = ({ showEquipment, setShowEquipment, showBackpack, setShowBackpack }) => {
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
  const dispatch = useDispatch()

  const handleAttackEnemy = () => {
    dispatch(enemyTakeDamage(heroWeapon.damage!))
    dispatch(setEnemyIsAttacked(true));

  setTimeout(() => {
    dispatch(setEnemyIsAttacked(false));

    // Wait for 1 second before the second flash
    setTimeout(() => {
      dispatch(setEnemyIsAttacked(true));

      setTimeout(() => {
        dispatch(setEnemyIsAttacked(false));
      }, 100); // Second flash duration is 1 second
    }, 100); // Wait for 1 second before the second flash
  }, 100); // First flash duration is 1 second
    dispatch(setPlayerTurn(false))
  }

  return (
    <div className={`hero-container ${heroIsAttacked ? 'hero-attacked':''}`}>
      <div id="hero-stats">
      {/* <h1>Hero</h1>
      <p>Current World: {currentWorld}</p>
      <p>Level: {heroLevel}</p>
      <p>XP: {heroExperience}</p> */}
      <p>Health: {heroHealth}/{heroMaxHealth}</p>
      <p>Mana: {heroMana}</p>
      {/* <p>Weapon: {heroWeapon.name} (dmg: {heroWeapon.damage})</p>
      <p>Armor: {heroArmor.name ? heroArmor.name : 'None'} (defense: {heroArmor.defense ? heroArmor.defense : 0})</p>
      <p>Money: {heroMoney}</p> */}
      </div>
      
      <div id="hero-buttons">
      <button onClick={handleAttackEnemy} className='hero-button' disabled={!battleTurn || !inBattle}>Attack</button>
      <button className='hero-button'>Spells</button>
      <button className='hero-button' onClick={() => setShowEquipment(!showEquipment)} disabled={!battleTurn}>Equipment</button>
      <button className='hero-button' onClick={() => setShowBackpack(!showBackpack)} disabled={!battleTurn}>Backpack</button>
      </div>
      
    </div>
  )
}

export default Hero