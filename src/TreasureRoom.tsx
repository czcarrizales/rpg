import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeTreasure } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import {v4 as uuidv4} from 'uuid';
import { playSound } from './utilities';
import treasureAppears from '../public/sounds/treasureAppears.mp3'
import './TreasureRoom.css'
import select from '../public/sounds/select.mp3'

const TreasureRoom = () => {
  const [currentTreasure, setCurrentTreasure] = useState<any>('')
  const [treasureAppearing, setTreasureAppearing] = useState(true)
  const dispatch = useDispatch()
  const handleTakeTreasure = () => {
    dispatch(takeTreasure(currentTreasure))
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
    playSound(select)
  }

  useEffect(() => {
    const randomTreasures = [
      {
        id: uuidv4(),
        name: 'ruby',
        money: 15,
        image: '/images/treasure/ruby.png'
      },
      {
        id: uuidv4(),
        name: 'diamond',
        money: 100,
        image: '/images/treasure/diamond.png'
      }
    ]
    const randomIndex = Math.floor(Math.random() * randomTreasures.length)
    const randomTreasure = randomTreasures[randomIndex]
    setCurrentTreasure(randomTreasure)
    setTimeout(() => {
      setTreasureAppearing(false)
      playSound(treasureAppears)
    }, 1000);
  }, [])
  return (
    <div id='treasure-room-container'>
      <h1>Treasure Room</h1>
      <img className='treasure-room-image item-appearing' src={currentTreasure.image} alt="" />
      <p className={treasureAppearing ? 'item-appearing-hide-content' : ''}>You found a {currentTreasure.name}!</p>
      <button onClick={handleTakeTreasure} className={`take-button ${treasureAppearing ? 'item-appearing-hide-content' : ''}`}>Take Treasure</button>
    </div>
  )
}

export default TreasureRoom