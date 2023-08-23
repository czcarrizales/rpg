import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { takeTreasure } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import {v4 as uuidv4} from 'uuid';
import { playSelectSound, playTreasureAppearsSound } from './utilities';
import './TreasureRoom.css'


const TreasureRoom = () => {
  const [currentTreasure, setCurrentTreasure] = useState<any>('')
  const [treasureAppearing, setTreasureAppearing] = useState(true)
  const [treasureAmount, setTreasureAmount] = useState(1)
  const dispatch = useDispatch()
  const handleTakeTreasure = () => {
    dispatch(takeTreasure(currentTreasure))
    playSelectSound()
    setTreasureAmount((prevAmount) => prevAmount - 1)
    if (treasureAmount === 0) {
      dispatch(goToMapRoom())
      dispatch(setInRoom(false))
    } else {
      getRandomTreasure()
    }
  }

  const getRandomTreasure = () => {
    const randomTreasures = [
      {
        id: uuidv4(),
        name: 'Ruby',
        money: 5,
        image: '/images/treasure/ruby.png'
      },
      {
        id: uuidv4(),
        name: 'Diamond',
        money: 50,
        image: '/images/treasure/diamond.png'
      },
      {
        id: uuidv4(),
        name: 'Amethyst',
        money: 15,
        image: '/images/treasure/amethyst.png'
      },
      {
        id: uuidv4(),
        name: 'Crown',
        money: 20,
        image: '/images/treasure/crown.png'
      },
      {
        id: uuidv4(),
        name: 'Emerald',
        money: 15,
        image: '/images/treasure/emerald.png'
      },
      {
        id: uuidv4(),
        name: 'Sapphire',
        money: 15,
        image: '/images/treasure/sapphire.png'
      },
      {
        id: uuidv4(),
        name: 'Silver Ring',
        money: 5,
        image: '/images/treasure/silverRing.png'
      }
    ]
    setTreasureAppearing(true)
    const randomIndex = Math.floor(Math.random() * randomTreasures.length)
    const randomTreasure = randomTreasures[randomIndex]
    setCurrentTreasure(randomTreasure)
    setTimeout(() => {
      setTreasureAppearing(false)
      playTreasureAppearsSound()
    }, 1000);
  }

  useEffect(() => {
    const randomTreasureAmount = Math.floor(Math.random() * 3)
    setTreasureAmount(randomTreasureAmount)
    getRandomTreasure()
  }, [])

  useEffect(() => {
    console.log(treasureAmount)
  }, [treasureAmount])

  return (
    <div id='treasure-room-container'>
      <h1>Treasure Room</h1>
      <img className={`treasure-room-image ${treasureAppearing ? 'item-appearing' : ''}`} src={currentTreasure?.image} alt="" />
      <p className={treasureAppearing ? 'item-appearing-hide-content' : ''}>You found a {currentTreasure.name}!</p>
      <button onClick={handleTakeTreasure} className={`take-button ${treasureAppearing ? 'item-appearing-hide-content' : ''}`}>Take Treasure</button>
    </div>
  )
}

export default TreasureRoom