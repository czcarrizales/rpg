import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInBattle, setPlayerTurn } from './slices/battleSlice'
import {  enemyReset, setBossType } from './slices/enemySlice'
import { gainExperience, heroTakeDamage } from './slices/heroSlice'
import { goToMapRoom, setBossBattle, setInRoom, setRandomRooms, setResettingRooms } from './slices/roomSlice'
import { setCurrentWorld, setGameOver } from './slices/gameSlice'
import './BossRoom.css'
import { RootState } from './store'

const BossRoom = () => {
  const dispatch = useDispatch()
  const currentEnemy = useSelector((state: RootState) => state.enemy.currentEnemy) as any
  const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom)
  const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
  const [bossTypeSet, setBossTypeSet] = useState(false)

  useEffect(() => {
      dispatch(setBossType(currentWorld))
      setBossTypeSet(true)
      dispatch(setInBattle(true))
  }, [])

  useEffect(() => {
      if (bossTypeSet && currentEnemy.health <= 0 ) {
        if (currentWorld == 5 && currentRoom == 'bossRoom') {
            dispatch(setGameOver(true))
            console.log('game is over!')
        } else {
            console.log('boss is dead')
            setBossTypeSet(false)
            dispatch(gainExperience(currentEnemy.experience))
            dispatch(enemyReset())
            dispatch(goToMapRoom())
            dispatch(setInRoom(false))
            dispatch(setResettingRooms())
            dispatch(setRandomRooms())
            dispatch(setBossBattle(false))
            dispatch(setCurrentWorld())
            dispatch(setInBattle(false))
            setTimeout(() => {
              dispatch(setResettingRooms())
            }, 1000);
        }
          
      } else {
          console.log('enemy lives!')
      }
  }, [currentEnemy, bossTypeSet])

  useEffect(() => {
      if (battleTurn === false && currentEnemy.health > 0) {
          setTimeout(() => {
              dispatch(heroTakeDamage(currentEnemy.attack))
          dispatch(setPlayerTurn(true))
          }, 500);
          
      } else {
          dispatch(setPlayerTurn(true))
      }
  }, [battleTurn])

  return (
      <div id='boss-room-container'>
          <h1>{currentEnemy.name}</h1>
          <p>Health: {currentEnemy.health}</p>
          <p>Intent: Attack for {currentEnemy.attack} damage!</p>
          {/* <p>Armor: {enemyArmor}</p> */}
      </div>
  )
}

export default BossRoom