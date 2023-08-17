import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeWeapon } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './WeaponRoom.css'
import { setNewEquipment } from './slices/gameSlice'
import { playSound } from './utilities'
import equipmentAppears from '../public/sounds/equipmentAppears.mp3'

interface Weapon {
  type: string;
  name: string;
  damage: number;
  image: string;
}

const WeaponRoom = () => {
  const [currentWeapon, setCurrentWeapon] = useState<Weapon | null>(null)
  const [weaponAppearing, setWeaponAppearing] = useState(true)
  const dispatch = useDispatch()
  const handleTakeWeapon = () => {
    dispatch(takeWeapon(currentWeapon))
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
    dispatch(setNewEquipment(true))
  }

  useEffect(() => {
    const randomWeapons = [
        {
            type: 'weapon',
            name: 'wooden sword',
            damage: 2,
            image: '/images/weapons/wooden-sword.png'
        },
        {
            type: 'weapon',
            name: 'bronze sword',
            damage: 4,
            image: '/images/weapons/bronze-sword.png'
        },
        {
            type: 'weapon',
            name: 'iron sword',
            damage: 6,
            image: '/images/weapons/iron-sword.png'
        },
        {
          type: 'weapon',
            name: 'marble sword',
            damage: 8,
            image: '/images/weapons/marble-sword.png'
        },
        {
          type: 'weapon',
            name: 'obsidian sword',
            damage: 10,
            image: '/images/weapons/obsidian-sword.png'
        },
        {
          type: 'weapon',
            name: 'gold sword',
            damage: 12,
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
    setTimeout(() => {
      playSound(equipmentAppears)
      setWeaponAppearing(false)
    }, 1000);
  }, [])
  return (
    <div id='weapon-room-container'>
      <h1>Weapon Room</h1>
      <img className='weapon-room-image item-appearing' src={currentWeapon?.image} alt=" " />
      <p className={weaponAppearing ? 'item-appearing-hide-content' : ''}>You found a {currentWeapon?.name}!</p>
      <button className={`take-button ${weaponAppearing ? 'item-appearing/hide-content' : ''}`} onClick={handleTakeWeapon}>Take Weapon</button>
    </div>
  )
}

export default WeaponRoom