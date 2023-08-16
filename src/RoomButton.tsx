import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { goToRandomRoom, setInRoom, setResettingRooms } from './slices/roomSlice'
import './RoomButton.css'
import { AppDispatch, RootState } from './store';
import { resetGame, setPlayingMusic, setRandomEncounterAnimation } from './slices/gameSlice';

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
  const handleRandomRoom = async () => {
    dispatch(goToRandomRoom())
    setVisited(true)
  }

  const waitForConsoleLog = () => {
    return new Promise((resolve) => {
      if (currentRoom == 'enemyRoom') {
        dispatch(setRandomEncounterAnimation(true))
        setTimeout(resolve, 400)
      } else {
        resolve(undefined)
      }
    })
  }

  useEffect(() => {
    console.log('current room')
    const checkCurrentRoom = async () => {
      if (currentRoom === 'enemyRoom') {
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
        dispatch(setInRoom(true))
        console.log(inRoom, 'in room')
      }

    }
    checkCurrentRoom()
  }, [currentRoom])

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