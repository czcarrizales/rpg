import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { takeArmor } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './ArmorRoom.css'
import { RootState } from './store'
import { setNewEquipment } from './slices/gameSlice'
import { playSound } from './utilities'
import soundsAndMusic from './audioUtils'

interface Armor {
  type: string | null,
  name: string | null,
  defense: number | null,
  image: string | null
}

const ArmorRoom = () => {
  const [currentArmor, setCurrentArmor] = useState<Armor | null>(null)
  const [armorAppearing, setArmorAppearing] = useState(true)
  const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
  const dispatch = useDispatch()
  const handleTakeArmor = () => {
    dispatch(takeArmor(currentArmor))
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
    dispatch(setNewEquipment(true))
    playSound(soundsAndMusic.selectSound)
  }

  useEffect(() => {
    const randomArmor = [
      {
        type: 'armor',
        name: 'wooden shield',
        defense: 2,
        world: 1,
        image: '/images/armor/wooden-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'bronze shield',
        defense: 4,
        world: 1,
        image: '/images/armor/bronze-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'iron shield',
        defense: 6,
        world: 2,
        image: '/images/armor/iron-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'marble shield',
        defense: 8,
        world: 2,
        image: '/images/armor/marble-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'obsidian shield',
        defense: 10,
        world: 3,
        image: '/images/armor/obsidian-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'gold shield',
        defense: 12,
        world: 3,
        image: '/images/armor/gold-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'gold shield',
        defense: 12,
        world: 4,
        image: '/images/armor/gold-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'gold shield',
        defense: 12,
        world: 5,
        image: '/images/armor/gold-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'gold shield',
        defense: 12,
        world: 6,
        image: '/images/armor/gold-shield.png',
        isNew: false
      },
      {
        type: 'armor',
        name: 'gold shield',
        defense: 12,
        world: 7,
        image: '/images/armor/gold-shield.png',
        isNew: false
      }
    ]
    const currentWorldArmorPool = randomArmor.filter(item => item.world == currentWorld)
    const randomIndex = Math.floor(Math.random() * currentWorldArmorPool.length)
    setCurrentArmor(currentWorldArmorPool[randomIndex])
    setTimeout(() => {
      setArmorAppearing(false)
      playSound(soundsAndMusic.equipmentAppearsSound)
    }, 1000);
  }, [])
  return (
    <div id='armor-room-container'>
      <h1>Armor Room</h1>
      <img className='armor-room-image item-appearing' src={currentArmor?.image!} alt="" />
      <p className={armorAppearing ? 'item-appearing-hide-content' : ''}>You found a {currentArmor?.name}!</p>
      <button className={`take-button ${armorAppearing ? 'item-appearing-hide-content' : ''}`} onClick={handleTakeArmor}>Take Armor</button>
    </div>
  )
}

export default ArmorRoom