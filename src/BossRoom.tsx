import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInBattle, setPlayerTurn } from './slices/battleSlice'
import {  enemyReset, setBossType } from './slices/enemySlice'
import { gainExperience, heroTakeDamage, setHeroIsAttacked } from './slices/heroSlice'
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
  const enemyIsAttacked = useSelector((state: RootState) => state.enemy.enemyIsAttacked)
  const inAnimation = useSelector((state: RootState) => state.game.inAnimation)
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
            if (!inAnimation) {
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
            
        }
          
      } else {
          console.log('enemy lives!')
      }
  }, [currentEnemy, bossTypeSet, inAnimation])

  useEffect(() => {
      if (battleTurn === false && currentEnemy.health > 0) {
          setTimeout(() => {
              dispatch(heroTakeDamage(currentEnemy.attack))
              setTimeout(() => {
                dispatch(setHeroIsAttacked(true));
                
                setTimeout(() => {
                  dispatch(setHeroIsAttacked(false));
                  
                  // Wait for 1 second before the second flash
                  setTimeout(() => {
                    dispatch(setHeroIsAttacked(true));
                    
                    setTimeout(() => {
                      dispatch(setHeroIsAttacked(false));
                    }, 100); // Second flash duration is 1 second
                  }, 100); // Wait for 1 second before the second flash
                  
                }, 100); // Second flash start after 100 milliseconds
              }, 100); // First flash duration is 100 milliseconds
          dispatch(setPlayerTurn(true))
          }, 500);
          
      } else {
          dispatch(setPlayerTurn(true))
      }
  }, [battleTurn])

  return (
      <div className={`boss-room-container`}>
          <h1>{currentEnemy.name}</h1>
          <img className={`enemy-image ${enemyIsAttacked ? 'enemy-attacked':''}`} src={currentEnemy.image} alt="" />
          <p>Health: {currentEnemy.health}</p>
          <p>Intent: Attack for {currentEnemy.attack} damage!</p>
          {/* <p>Armor: {enemyArmor}</p> */}
      </div>
  )
}

export default BossRoom