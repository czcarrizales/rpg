import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeTreasure } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './TreasureRoom.css'

const TreasureRoom = () => {
  const [currentTreasure, setCurrentTreasure] = useState('')
  const dispatch = useDispatch()
  const handleTakeTreasure = () => {
    dispatch(takeTreasure(currentTreasure))
    dispatch(goToMapRoom())
    dispatch(setInRoom())
  }

  useEffect(() => {
    const randomTreasures = [
      {
        name: 'pearl',
        money: 15
      },
      {
        name: 'diamond',
        money: 100
      }
    ]
    const randomIndex = Math.floor(Math.random() * randomTreasures.length)
    setCurrentTreasure(randomTreasures[randomIndex])
  }, [])
  return (
    <div id='treasure-room-container'>
      <h1>Treasure Room</h1>
      <p>You found a {currentTreasure.name}!</p>
      <button onClick={handleTakeTreasure}>Take Treasure</button>
    </div>
  )
}

export default TreasureRoom