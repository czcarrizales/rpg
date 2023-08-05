import './App.css'
import Enemy from './Enemy'
import Hero from './Hero'
import TreasureRoom from './TreasureRoom'
import HealingRoom from './HealingRoom'
import BossRoom from './BossRoom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToRandomRoom } from './slices/roomSlice'
import Equipment from './Equipment'
import WeaponRoom from './WeaponRoom'

function App() {

  const roomState = useSelector(state => state.room.currentRoom)
  const [showEquipment, setShowEquipment] = useState(false)
  const [inBattle, setInBattle] = useState(false)
  const dispatch = useDispatch()

  const handleRandomRoom = () => {
    dispatch(goToRandomRoom())
  }

  return (
    <div className='board'>
      <div id='current-room'>
      {roomState === 'map' && <button onClick={handleRandomRoom}>Go To Random Room</button>}
      {roomState === 'enemy' && <Enemy />}
      {roomState === 'treasure' && <TreasureRoom />}
      {roomState === 'healingRoom' && <HealingRoom />}
      {roomState === 'weaponRoom' && <WeaponRoom />}
      </div>
      <div id='current-hero'>
      <Hero setShowEquipment={setShowEquipment} showEquipment={showEquipment} inBattle={inBattle} />
      {showEquipment && <Equipment />}
      </div>
      
    </div>
  )
}

export default App
