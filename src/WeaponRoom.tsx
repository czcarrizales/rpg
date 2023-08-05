import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeWeapon } from './slices/heroSlice'
import { goToMapRoom } from './slices/roomSlice'

const WeaponRoom = () => {
  const [currentWeapon, setCurrentWeapon] = useState({})
  const dispatch = useDispatch()
  const handleTakeWeapon = () => {
    dispatch(takeWeapon(currentWeapon))
    dispatch(goToMapRoom())
  }

  useEffect(() => {
    const randomWeapons = [
        {
            type: 'weapon',
            name: 'shovel',
            damage: 10
        },
        {
            type: 'weapon',
            name: 'excalibur',
            damage: 50
        },
        {
            type: 'weapon',
            name: 'keyblade',
            damage: 30
        }
    ]
    const randomIndex = Math.floor(Math.random() * randomWeapons.length)
    setCurrentWeapon(randomWeapons[randomIndex])
  }, [])
  return (
    <div>
      <h1>Weapon Room</h1>
      <p>You found a {currentWeapon.name}!</p>
      <button onClick={handleTakeWeapon}>Take Treasure</button>
    </div>
  )
}

export default WeaponRoom