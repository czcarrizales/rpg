import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeWeapon } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './WeaponRoom.css'

interface Weapon {
  type: string;
  name: string;
  damage: number;
  image: string;
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
            name: 'wooden sword',
            damage: 5,
            image: '/images/weapons/wooden-sword.png'
        },
        {
            type: 'weapon',
            name: 'bronze sword',
            damage: 10,
            image: '/images/weapons/bronze-sword.png'
        },
        {
            type: 'weapon',
            name: 'iron sword',
            damage: 30,
            image: '/images/weapons/iron-sword.png'
        },
        {
          type: 'weapon',
            name: 'marble sword',
            damage: 40,
            image: '/images/weapons/marble-sword.png'
        },
        {
          type: 'weapon',
            name: 'obsidian sword',
            damage: 50,
            image: '/images/weapons/obsidian-sword.png'
        },
        {
          type: 'weapon',
            name: 'gold sword',
            damage: 60,
            image: '/images/weapons/gold-sword.png'
        }
    ]
    const randomIndex = Math.floor(Math.random() * randomWeapons.length)
    const newWeapon = {
      type: randomWeapons[randomIndex].type,
      name: randomWeapons[randomIndex].name,
      damage: randomWeapons[randomIndex].damage,
      image: randomWeapons[randomIndex].image
    }
    setCurrentWeapon((prevWeapon) => ({
      ...prevWeapon,
      type: newWeapon.type,
      name: newWeapon.name,
      damage: newWeapon.damage,
      image: newWeapon.image
    }))
  }, [])
  return (
    <div id='weapon-room-container'>
      <h1>Weapon Room</h1>
      <p>You found a {currentWeapon?.name}!</p>
      <img className='weapon-room-image' src={currentWeapon?.image} alt=" " />
      <button className='take-button' onClick={handleTakeWeapon}>Take Weapon</button>
    </div>
  )
}

export default WeaponRoom