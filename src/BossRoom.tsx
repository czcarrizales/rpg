import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInBattle, setPlayerTurn } from './slices/battleSlice'
import {  enemyReset, setBossType, setRandomEnemyDamage } from './slices/enemySlice'
import { gainExperience, heroTakeDamage, setHeroIsAttacked } from './slices/heroSlice'
import { goToMapRoom, setBossBattle, setInRoom, setRandomRooms, setResettingRooms } from './slices/roomSlice'
import { setAfterBattle, setCurrentWorld, setGameOver } from './slices/gameSlice'
import './BossRoom.css'
import { RootState } from './store'
import AfterBattle from './AfterBattle'
import { resetIdOnAllShopItems, restockShop } from './slices/shopSlice'

const BossRoom = () => {
  const dispatch = useDispatch()
  const currentEnemy = useSelector((state: RootState) => state.enemy.currentEnemy) as any
  const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom)
  const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
  const enemyIsAttacked = useSelector((state: RootState) => state.enemy.enemyIsAttacked)
  const inAnimation = useSelector((state: RootState) => state.game.inAnimation)
  const afterBattle = useSelector((state: RootState) => state.game.afterBattle)
  const randomEnemyDamage = useSelector((state: RootState) => state.enemy.randomEnemyDamage)
  const [bossTypeSet, setBossTypeSet] = useState(false)
  const [randomMoney, setRandomMoney] = useState(0)

  const handleRandomMoney = (x: number) => {
    const min = 25;
    const multiplier = 30;
    const randomNumber = Math.floor(Math.random() * (multiplier - min) + min);
    setRandomMoney(randomNumber * x)
}

const handleRandomDamage = () => {
    const randomDamageNumber = Math.floor(Math.random() * (currentEnemy.maxAttack! - currentEnemy.minAttack! + 1)) + currentEnemy.minAttack!;
    return randomDamageNumber
}
useEffect(() => {
    dispatch(setBossType(currentWorld))
    setBossTypeSet(true)
    dispatch(setInBattle(true))
    handleRandomMoney(currentWorld)
}, [])

useEffect(() => {
    dispatch(setRandomEnemyDamage(handleRandomDamage()))
}, [currentEnemy.name])

  

  useEffect(() => {
      if (bossTypeSet && currentEnemy.health <= 0 ) {
        if (currentWorld == 5 && currentRoom == 'bossRoom') {
            dispatch(setGameOver(true))
            console.log('game is over!')
        } else {
            if (!inAnimation) {
                dispatch(setAfterBattle(true))
                dispatch(gainExperience(currentEnemy.experience))
                dispatch(setResettingRooms())
                dispatch(setRandomRooms())
                dispatch(setBossBattle(false))
                dispatch(setCurrentWorld())
                dispatch(setInBattle(false))
                dispatch(restockShop())
                dispatch(resetIdOnAllShopItems())
                setTimeout(() => {
                  dispatch(setResettingRooms())
                }, 1000);
            }
        }
          
      } else {
          console.log('boss lives!')
      }
  }, [currentEnemy, inAnimation])

  useEffect(() => {
      if (battleTurn === false && currentEnemy.health > 0) {
              dispatch(heroTakeDamage(randomEnemyDamage))
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
          
      } else {
          dispatch(setPlayerTurn(true))
      }
  }, [battleTurn])

  useEffect(() => {
    console.log('afterBattle changed')
    console.log(bossTypeSet, 'bosstypeset')
    console.log(afterBattle, 'afterbattle')
    console.log(currentEnemy.health, 'currentenemy health')
    if (bossTypeSet && afterBattle === false && currentEnemy.health! <= 0) {
        console.log('should go to map now')
        setBossTypeSet(false)
        dispatch(goToMapRoom())
        dispatch(setInRoom(false))
        dispatch(enemyReset())
    }
}, [afterBattle])

  return (
    !afterBattle
    ?
      <div className={`boss-room-container`}>
          <h1 className='boss-room-name'>{currentEnemy.name}</h1>
          <img className={`enemy-image ${enemyIsAttacked ? 'enemy-attacked':''}`} src={currentEnemy.image} alt="" />
          <div className='boss-room-details'>
          <p>Health: {currentEnemy.health}</p>
          <p>Intent: Attack for {randomEnemyDamage} damage!</p>
          </div>
          
      </div>
      :
      <AfterBattle name={currentEnemy.name} xp={currentEnemy.experience} money={randomMoney} />
  )
}

export default BossRoom