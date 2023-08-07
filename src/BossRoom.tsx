import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerTurn } from './slices/battleSlice'
import { setEnemyType, enemyReset, setBossType } from './slices/enemySlice'
import { gainExperience, heroTakeDamage } from './slices/heroSlice'
import { goToMapRoom, setBossBattle, setInRoom, setRandomRooms, setResettingRooms } from './slices/roomSlice'
import { setCurrentWorld } from './slices/gameSlice'

const BossRoom = () => {
  const dispatch = useDispatch()
  const currentEnemy = useSelector(state => state.enemy.currentEnemy)
  const currentWorld = useSelector(state => state.game.currentWorld)
  const battleTurn = useSelector(state => state.battle.playerTurn)
  const [bossTypeSet, setBossTypeSet] = useState(false)

  useEffect(() => {
      dispatch(setBossType(currentWorld))
      setBossTypeSet(true)
  }, [])

  useEffect(() => {
      if (bossTypeSet && currentEnemy.health <= 0 ) {
          console.log('boss is dead')
          setBossTypeSet(false)
          dispatch(gainExperience(currentEnemy.experience))
          dispatch(enemyReset())
          dispatch(goToMapRoom())
          dispatch(setInRoom())
          dispatch(setResettingRooms())
          dispatch(setRandomRooms())
          dispatch(setBossBattle())
          dispatch(setCurrentWorld())
          setTimeout(() => {
            dispatch(setResettingRooms())
          }, 1000);
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
      <div id='enemy-container'>
          <h1>{currentEnemy.name}</h1>
          <p>Health: {currentEnemy.health}</p>
          <p>Intent: Attack for {currentEnemy.attack} damage!</p>
          {/* <p>Armor: {enemyArmor}</p> */}
      </div>
  )
}

export default BossRoom