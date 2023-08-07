import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { goToRandomRoom, setInRoom } from './slices/roomSlice'
import './RoomButton.css'

const RoomButton = ({inRoom}) => {
    const gameState = useSelector(state => state.game)
    const dispatch = useDispatch()
    const [visited, setVisited] = useState(false)
    const handleRandomRoom = () => {
        dispatch(goToRandomRoom())
        dispatch(setInRoom())
        setVisited(true)
      }

    useEffect(() => {
        console.log(visited)
    }, [visited])

    useEffect(() => {
      if (gameState.resettingGame == true) {
        console.log('resetting game is true!')
        setVisited(false)
      }
    }, [gameState])
  return (
    <div>
        <button onClick={() => {handleRandomRoom(), setVisited(true)}} disabled={visited || inRoom} className='room-button'>?</button>
    </div>
  )
}

export default RoomButton