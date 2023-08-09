import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeArmor } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './ArmorRoom.css'

const ArmorRoom = () => {
  const [currentArmor, setCurrentArmor] = useState({})
  const dispatch = useDispatch()
  const handleTakeArmor = () => {
    dispatch(takeArmor(currentArmor))
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
  }

  useEffect(() => {
    const randomArmor = [
        {
            type: 'armor',
            name: 'rusty helmet',
            defense: 10
        },
        {
            type: 'armor',
            name: 'leather suit',
            defense: 20
        },
        {
            type: 'armor',
            name: 'holy shield',
            defense: 50
        }
    ]
    const randomIndex = Math.floor(Math.random() * randomArmor.length)
    setCurrentArmor(randomArmor[randomIndex])
  }, [])
  return (
    <div id='armor-room-container'>
      <h1>Armor Room</h1>
      <p>You found {currentArmor.name}!</p>
      <button onClick={handleTakeArmor}>Take Armor</button>
    </div>
  )
}

export default ArmorRoom