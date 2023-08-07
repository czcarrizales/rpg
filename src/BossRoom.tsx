import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerTurn } from './slices/battleSlice'
import { setEnemyType, enemyReset, setBossType } from './slices/enemySlice'
import { gainExperience, heroTakeDamage } from './slices/heroSlice'
import { goToMapRoom, setInRoom } from './slices/roomSlice'

const BossRoom = () => {
  const dispatch = useDispatch()
  const currentBoss = useSelector(state => state.enemy.currentBoss)
  const battleTurn = useSelector(state => state.battle.playerTurn)
  const [bossTypeSet, setBossTypeSet] = useState(false)

  useEffect(() => {
      dispatch(setBossType())
      setBossTypeSet(true)
  }, [])

  useEffect(() => {
      if (bossTypeSet && currentBoss.health <= 0 ) {
          console.log('boss is dead')
          setBossTypeSet(false)
          dispatch(gainExperience(currentBoss.experience))
          dispatch(enemyReset())
          dispatch(goToMapRoom())
          dispatch(setInRoom())
      } else {
          console.log('enemy lives!')
      }
  }, [currentBoss, bossTypeSet])

  useEffect(() => {
      if (battleTurn === false && currentBoss.health > 0) {
          setTimeout(() => {
              dispatch(heroTakeDamage(currentBoss.attack))
          dispatch(setPlayerTurn(true))
          }, 500);
          
      } else {
          dispatch(setPlayerTurn(true))
      }
  }, [battleTurn])

  return (
      <div id='enemy-container'>
          <h1>{currentBoss.name}</h1>
          <p>Health: {currentBoss.health}</p>
          <p>Intent: Attack for {currentBoss.attack} damage!</p>
          {/* <p>Armor: {enemyArmor}</p> */}
      </div>
  )
}

export default BossRoom