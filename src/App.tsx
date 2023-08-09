import './App.css'
import Enemy from './Enemy'
import Hero from './Hero'
import TreasureRoom from './TreasureRoom'
import HealingRoom from './HealingRoom'
import BossRoom from './BossRoom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToBossRoom, goToRandomRoom, setBossBattle, setInRoom, setRandomRooms } from './slices/roomSlice'
import Equipment from './Equipment'
import WeaponRoom from './WeaponRoom'
import Backpack from './Backpack'
import SpellRoom from './SpellRoom'
import RoomButton from './RoomButton'
import { gainLevel, gainMaxHealth, healToFull, resetExperience, resetHero } from './slices/heroSlice'
import { resetCurrentWorld, resetGame, setGameOver } from './slices/gameSlice'
import { GameOver } from './GameOver'
import ArmorRoom from './ArmorRoom'

function App() {

  const roomState = useSelector(state => state.room.currentRoom)
  const gameState = useSelector(state => state.game)
  const randomRooms = useSelector(state => state.room.randomRooms)
  const bossBattle = useSelector(state => state.room.bossBattle)
  const inRoom = useSelector(state => state.room.inRoom)
  const heroStats = useSelector(state => state.hero)
  const currentWorld = useSelector(state => state.game.currentWorld)
  const currentEnemy = useSelector(state => state.enemy.currentEnemy)
  const gameOver = useSelector(state => state.game.gameOver)
  const resettingGame = useSelector(state => state.game.resettingGame)
  const [showEquipment, setShowEquipment] = useState(false)
  const [showBackpack, setShowBackpack] = useState(false)
  const [inBattle, setInBattle] = useState(false)
  const dispatch = useDispatch()

  const handleBossRoom = () => {
    dispatch(goToBossRoom())
    dispatch(setInRoom(true))
  }

  useEffect(() => {
    dispatch(setRandomRooms())
    console.log(randomRooms)
  }, [])

  useEffect(() => {
    if (resettingGame && gameOver) {
      console.log('this is where we set the random rooms again')
    }
  }, [resettingGame, gameOver])

  useEffect(() => {
    console.log(heroStats)
    if(heroStats.experience >= 100) {
      dispatch(resetExperience())
      dispatch(gainLevel())
      dispatch(gainMaxHealth())
      dispatch(healToFull())
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
      dispatch(setGameOver(true))
    }
  }, [heroStats])

  useEffect(() => {
    if (currentWorld == 5 && currentEnemy.health <= 0 && currentEnemy.health !== null && roomState === 'bossRoom') {
      dispatch(resetGame(true))
      dispatch(resetHero())
      dispatch(resetCurrentWorld())
      console.log('game is over')
    }
  }, [currentWorld, currentEnemy.health])

  return (
    <div>
       {
      gameOver && <GameOver />
     }
     {
      !gameOver && (
<div className='board'>
  <div className='map' style={{display: inRoom && 'none'}}>
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
          {bossBattle ? <button className='room-button boss-room-button' onClick={handleBossRoom} disabled={inRoom}>Boss</button> : <RoomButton inRoom={inRoom} />}
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
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
    </div>
     }
      <div id='current-hero'>
        <Hero setShowEquipment={setShowEquipment} showEquipment={showEquipment} showBackpack={showBackpack} setShowBackpack={setShowBackpack} inBattle={inBattle} />
        {showEquipment && <Equipment />}
        {showBackpack && <Backpack />}
      </div>
    </div>
      )
     }
    </div>
   
    
  )
}

export default App
