import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { goToRandomRoom, setInRoom, setResettingRooms } from './slices/roomSlice'
import './RoomButton.css'
import { AppDispatch, RootState } from './store';
import { resetGame, setPlayingMusic, setRandomEncounterAnimation } from './slices/gameSlice';
import enemyEncounter from '../public/sounds/enemyEncounter.mp3'
import select from '../public/sounds/select.mp3'
import shopAppears from '../public/sounds/shopAppears.mp3'
import { playSound } from './utilities';
interface RoomButtonProps {
  inRoom: boolean;
}

const RoomButton: React.FC<RoomButtonProps> = ({ inRoom }) => {
  const gameState = useSelector((state: RootState) => state.game)
  const resettingRooms = useSelector((state: RootState) => state.room.resettingRooms)
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom)
  const playingMusic = useSelector((state: RootState) => state.game.playingMusic)
  const dispatch = useDispatch<AppDispatch>()
  const [visited, setVisited] = useState(false)
  const [soundPlayed, setSoundPlayed] = useState(false)
  const handleRandomRoom = async () => {
    dispatch(goToRandomRoom())
    setVisited(true)
  }

  const playRoomSound = (sound: string) => {
    const audio = new Audio(sound)
    audio.volume = 0.35
    audio.play()
    setSoundPlayed(true)
  }

  const waitForConsoleLog = () => {
    return new Promise((resolve) => {
      if (currentRoom == 'enemyRoom') {
        dispatch(setRandomEncounterAnimation(true))
        setTimeout(resolve, 1000)
      } else {
        resolve(undefined)
      }
    })
  }

  useEffect(() => {
    console.log('current room')
    const checkCurrentRoom = async () => {
      if (visited && !soundPlayed) {
        if (currentRoom === 'shopRoom') {
          playRoomSound(shopAppears)
          playSound(select)
        } else if (currentRoom === 'enemyRoom') {
          console.log('playing enemyroom sound')
          playRoomSound(enemyEncounter)
          await waitForConsoleLog()
          if (!playingMusic) {
            dispatch(setPlayingMusic(true))
          }
          dispatch(setRandomEncounterAnimation(false))
          dispatch(setInRoom(true))
        } else if (currentRoom !== 'map') {
          if (!playingMusic) {
            dispatch(setPlayingMusic(true))
          }
          playSound(select)
          console.log('playing select sound')
          dispatch(setInRoom(true))
          console.log(inRoom, 'in room')
        }
      }
      

    }
    checkCurrentRoom()
  }, [currentRoom, visited])

  useEffect(() => {
    if (gameState.resettingGame == true) {
      console.log('resetting game is true!')
      setVisited(false)
      dispatch(resetGame(false))
    }
  }, [gameState])

  useEffect(() => {
    if (resettingRooms == true) {
      setVisited(false)
      setSoundPlayed(false)
      dispatch(setResettingRooms(false))
    }
  }, [resettingRooms])

  return (
    <div>
      <button onClick={() => { handleRandomRoom(), setVisited(true) }} disabled={visited || inRoom} className='room-button'>?</button>
    </div>
  )
}

export default RoomButton