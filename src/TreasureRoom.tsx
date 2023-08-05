import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeTreasure } from './slices/heroSlice'
import { goToMapRoom } from './slices/roomSlice'

const TreasureRoom = () => {
  const [currentTreasure, setCurrentTreasure] = useState('')
  const dispatch = useDispatch()
  const handleTakeTreasure = () => {
    dispatch(takeTreasure(currentTreasure))
    dispatch(goToMapRoom())
  }

  useEffect(() => {
    const randomTreasures = ['diamond', 'pearl', 'crown', 'necklace']
    const randomIndex = Math.floor(Math.random() * randomTreasures.length)
    setCurrentTreasure(randomTreasures[randomIndex])
  }, [])
  return (
    <div>
      <h1>Treasure Room</h1>
      <p>You found a {currentTreasure}!</p>
      <button onClick={handleTakeTreasure}>Take Treasure</button>
    </div>
  )
}

export default TreasureRoom