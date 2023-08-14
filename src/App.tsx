import './App.css'
import Enemy from './Enemy'
import Hero from './Hero'
import TreasureRoom from './TreasureRoom'
import HealingRoom from './HealingRoom'
import BossRoom from './BossRoom'
import { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToBossRoom, goToHealingRoom, goToShopRoom, setBossBattle, setInRoom, setRandomRooms } from './slices/roomSlice'
import WeaponRoom from './WeaponRoom'
import SpellRoom from './SpellRoom'
import RoomButton from './RoomButton'
import { gainLevel, resetHero } from './slices/heroSlice'
import { resetCurrentWorld, resetGame, setGameOver, setLevelingUp } from './slices/gameSlice'
import { GameOver } from './GameOver'
import ArmorRoom from './ArmorRoom'
import { RootState } from './store'
import ShopRoom from './ShopRoom'

function App() {

  const roomState = useSelector((state: RootState) => state.room.currentRoom)
  const randomRooms = useSelector((state: RootState) => state.room.randomRooms)
  const bossBattle = useSelector((state: RootState) => state.room.bossBattle)
  const inRoom = useSelector((state: RootState) => state.room.inRoom)
  const heroStats = useSelector((state: RootState) => state.hero)
  const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
  const currentEnemy = useSelector((state: RootState) => state.enemy.currentEnemy)
  const gameOver = useSelector((state: RootState) => state.game.gameOver)
  const dispatch = useDispatch()

  const handleBossRoom = () => {
    dispatch(goToBossRoom())
    dispatch(setInRoom(true))
  }

  const handleShopRoom = () => {
    dispatch(goToShopRoom())
    dispatch(setInRoom(true))
  }

  const handleHealingRoom = () => {
    dispatch(goToHealingRoom())
    dispatch(setInRoom(true))
  }

  useEffect(() => {
    dispatch(setRandomRooms())
  }, [])

  useEffect(() => {
    if(heroStats.experience >= heroStats.experienceToLevelUp) {
      dispatch(gainLevel())
      dispatch(setLevelingUp(true))
      console.log('hero levels up!')
    }
  }, [heroStats.experience])

  useEffect(() => {
    if (randomRooms.length === 0 && !inRoom) {
      dispatch(setBossBattle(true))
      console.log('boss room shows!')
    }
    
  }, [randomRooms, inRoom])

  useEffect(() => {
    if (heroStats.health <= 0) {
      dispatch(setInRoom(false))
      dispatch(setGameOver(true))
      console.log('game is over because hero died')
    }
  }, [heroStats])

  useEffect(() => {
    if (currentWorld == 5 && currentEnemy.health! <= 0 && currentEnemy.health !== null && roomState === 'bossRoom') {
      dispatch(resetGame(true))
      setTimeout(() => {
        dispatch(resetGame(false))
      }, 100);
      dispatch(resetHero())
      dispatch(resetCurrentWorld())
      console.log('game is over')
    }
  }, [currentWorld, currentEnemy.health])

  return (
<div className='board'>
  
  <div style={{display: inRoom ? 'none' : undefined}}>
    {
      !gameOver
      ?
      (
        <div id='current-room' className='map'>
<RoomButton inRoom={inRoom} />
          {bossBattle ? <button id='map-healing-room-button' className='room-button' onClick={handleHealingRoom} disabled={inRoom}>Rest</button> : <RoomButton inRoom={inRoom} />}
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
          {bossBattle ? <button className='room-button boss-room-button' onClick={handleBossRoom} disabled={inRoom}>Boss</button> : <RoomButton inRoom={inRoom} />}
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
          {bossBattle ? <button onClick={handleShopRoom} id='map-shop-room-button' className='room-button'>Shop</button> : <RoomButton inRoom={inRoom} />}
          <RoomButton inRoom={inRoom} />
          </div>
      )
          :
          <div id='current-room'>
            <GameOver />
          </div>
          
    }
  </div>
     {
      inRoom &&
      <div id='current-room'>
      {roomState === 'enemyRoom' && <Enemy />}
      {roomState === 'treasureRoom' && <TreasureRoom />}
      {roomState === 'healingRoom' && <HealingRoom />}
      {roomState === 'weaponRoom' && <WeaponRoom />}
      {roomState === 'armorRoom' && <ArmorRoom />}
      {roomState === 'bossRoom' && <BossRoom />}
      {roomState === 'spellRoom' && <SpellRoom />}
      {roomState === 'shopRoom' && <ShopRoom />}
      
    </div>
     }
      <div id='current-hero'>
        <Hero />
      </div>
    </div>
   
    
  )
}

export default App
