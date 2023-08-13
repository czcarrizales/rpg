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
        name: 'paper armor',
        defense: 5,
        world: 1,
        image: null
      },
      {
        type: 'armor',
        name: 'rusty armor',
        defense: 10,
        world: 1,
        image: '/images/armor/wooden-shield.png'
      },
      {
        type: 'armor',
        name: 'fur armor',
        defense: 15,
        world: 2,
        image: null
      },
      {
        type: 'armor',
        name: 'iron armor',
        defense: 20,
        world: 2,
        image: null
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