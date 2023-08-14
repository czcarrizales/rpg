import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { takeArmor } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import './ArmorRoom.css'
import { RootState } from './store'

interface Armor {
  type: string | null,
  name: string | null,
  defense: number | null,
  image: string | null
}

const ArmorRoom = () => {
  const [currentArmor, setCurrentArmor] = useState<Armor | null>(null)
  const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
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
        name: 'wooden shield',
        defense: 2,
        world: 1,
        image: '/images/armor/wooden-shield.png'
      },
      {
        type: 'armor',
        name: 'bronze shield',
        defense: 4,
        world: 1,
        image: '/images/armor/bronze-shield.png'
      },
      {
        type: 'armor',
        name: 'iron shield',
        defense: 6,
        world: 2,
        image: '/images/armor/iron-shield.png'
      },
      {
        type: 'armor',
        name: 'marble shield',
        defense: 8,
        world: 2,
        image: '/images/armor/marble-shield.png'
      },
      {
        type: 'armor',
        name: 'obsidian shield',
        defense: 10,
        world: 3,
        image: '/images/armor/obsidian-shield.png'
      },
      {
        type: 'armor',
        name: 'gold shield',
        defense: 12,
        world: 3,
        image: '/images/armor/gold-shield.png'
      }
    ]
    const currentWorldArmorPool = randomArmor.filter(item => item.world == currentWorld)
    const randomIndex = Math.floor(Math.random() * currentWorldArmorPool.length)
    setCurrentArmor(currentWorldArmorPool[randomIndex])
  }, [])
  return (
    <div id='armor-room-container'>
      <h1>Armor Room</h1>
      <img className='armor-room-image' src={currentArmor?.image!} alt="" />
      <p>You found a {currentArmor?.name}!</p>
      <button className='take-button' onClick={handleTakeArmor}>Take Armor</button>
    </div>
  )
}

export default ArmorRoom