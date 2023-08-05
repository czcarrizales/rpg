import React from 'react'
import { useDispatch } from 'react-redux'
import { healToFull } from './slices/heroSlice'
import { goToMapRoom } from './slices/roomSlice'

const HealingRoom = () => {
    const dispatch = useDispatch()
    const handleHealHeroToFull = () => {
        dispatch(healToFull())
        dispatch(goToMapRoom())
    }
  return (
    <div>
        <h1>Healing Room</h1>
        <button onClick={handleHealHeroToFull}>Heal to full!</button>
    </div>
  )
}

export default HealingRoom