import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { goToRandomRoom, setInRoom } from './slices/roomSlice'
import './RoomButton.css'

const RoomButton = ({inRoom}) => {
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
  return (
    <div>
        <button onClick={() => {handleRandomRoom(), setVisited(true)}} disabled={visited || inRoom} className='room-button'>?</button>
    </div>
  )
}

export default RoomButton