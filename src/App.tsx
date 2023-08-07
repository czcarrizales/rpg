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
import { gainLevel, gainMaxHealth, healToFull, resetExperience } from './slices/heroSlice'

function App() {

  const roomState = useSelector(state => state.room.currentRoom)
  const randomRooms = useSelector(state => state.room.randomRooms)
  const bossBattle = useSelector(state => state.room.bossBattle)
  const inRoom = useSelector(state => state.room.inRoom)
  const heroStats = useSelector(state => state.hero)
  const [showEquipment, setShowEquipment] = useState(false)
  const [showBackpack, setShowBackpack] = useState(false)
  const [inBattle, setInBattle] = useState(false)
  const dispatch = useDispatch()

  const handleBossRoom = () => {
    dispatch(goToBossRoom())
    dispatch(setInRoom())
  }

  useEffect(() => {
    dispatch(setRandomRooms())
    console.log(randomRooms)
  }, [])

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
      dispatch(setBossBattle())
      console.log('boss room shows!')
    }
    
  }, [randomRooms, inRoom])

  return (
    <div className='board'>
        <div className='row'>
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
          <RoomButton inRoom={inRoom} />
        </div>
        <div className='row'>
          <RoomButton inRoom={inRoom} />
          {bossBattle ? <button onClick={handleBossRoom} disabled={inRoom}>Boss</button> : <RoomButton inRoom={inRoom} />}
          <RoomButton inRoom={inRoom} />
        </div>
        <div className='row'>
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

export default App
