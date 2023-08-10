import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeWeapon } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './WeaponRoom.css'

interface Weapon {
  type: string;
  name: string;
  damage: number;
}

const WeaponRoom = () => {
  const [currentWeapon, setCurrentWeapon] = useState<Weapon | null>(null)
  const dispatch = useDispatch()
  const handleTakeWeapon = () => {
    dispatch(takeWeapon(currentWeapon))
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
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
    const newWeapon = {
      type: randomWeapons[randomIndex].type,
      name: randomWeapons[randomIndex].name,
      damage: randomWeapons[randomIndex].damage
    }
    setCurrentWeapon((prevWeapon) => ({
      ...prevWeapon,
      type: newWeapon.type,
      name: newWeapon.name,
      damage: newWeapon.damage
    }))
  }, [])
  return (
    <div id='weapon-room-container'>
      <h1>Weapon Room</h1>
      <p>You found {currentWeapon?.name}!</p>
      <button className='take-button' onClick={handleTakeWeapon}>Take Weapon</button>
    </div>
  )
}

export default WeaponRoom