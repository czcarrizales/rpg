import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { takeWeapon } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './WeaponRoom.css'
import { setNewEquipment } from './slices/gameSlice'
import { playSound } from './utilities'
import { RootState } from './store'
import { removeFromCurrentWeaponPool } from './slices/weaponsSlice'
import soundsAndMusic from './audioUtils'

interface Weapon {
  type: string;
  name: string;
  damage: number;
  image: string;
}

const WeaponRoom = () => {
  const [currentWeapon, setCurrentWeapon] = useState<Weapon | null>(null)
  const [weaponAppearing, setWeaponAppearing] = useState(true)
  const currentWeaponPool = useSelector((state: RootState) => state.weapons.currentWeaponPool)
  const dispatch = useDispatch()
  const handleTakeWeapon = () => {
    dispatch(takeWeapon(currentWeapon))
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
    dispatch(setNewEquipment(true))
    dispatch(removeFromCurrentWeaponPool(currentWeapon))
    playSound(soundsAndMusic.selectSound)
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * currentWeaponPool.length)
    const newWeapon = {
      type: currentWeaponPool[randomIndex].type,
      name: currentWeaponPool[randomIndex].name,
      damage: currentWeaponPool[randomIndex].damage,
      image: currentWeaponPool[randomIndex].image
    }
    console.log(currentWeaponPool.length)
    setCurrentWeapon((prevWeapon) => ({
      ...prevWeapon,
      type: newWeapon.type,
      name: newWeapon.name,
      damage: newWeapon.damage,
      image: newWeapon.image
    }))
    setTimeout(() => {
      playSound(soundsAndMusic.equipmentAppearsSound)
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