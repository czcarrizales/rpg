import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToBattleDialogue, setInBattle, setPlayerTurn } from './slices/battleSlice'
import {  enemyReset, enemyTakeDamage, setBossType, setEnemyStatusPoints, setRandomEnemyDamage } from './slices/enemySlice'
import { gainExperience, heroTakeDamage, setHeroIsAttacked, setHeroStatusPoints } from './slices/heroSlice'
import { goToMapRoom, setBossBattle, setInRoom, setRandomRooms, setResettingRooms } from './slices/roomSlice'
import {  setAfterBattle,  setGameOver } from './slices/gameSlice'
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
  const inBattle = useSelector((state: RootState) => state.battle.inBattle)
  const afterBattle = useSelector((state: RootState) => state.game.afterBattle)
  const battleDialogue = useSelector((state: RootState) => state.battle.battleDialogue)
  const randomEnemyDamage = useSelector((state: RootState) => state.enemy.randomEnemyDamage)
  const animation = useSelector((state: RootState) => state.animation)
  const heroStats = useSelector((state: RootState) => state.hero)
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

const checkEnemyStatusEffect = () => {
    if (currentEnemy.status?.name! === 'Stop' && currentEnemy.status?.points! > 0) {
        dispatch(addToBattleDialogue(`${currentEnemy.name} is frozen and can not attack for ${currentEnemy.status?.points!} turn(s)!`))
        dispatch(setPlayerTurn(true))
        dispatch(setEnemyStatusPoints(-1))
        return true
    } else if (currentEnemy.status?.name! === 'Poison' && currentEnemy.status?.points! > 0) {
        dispatch(enemyTakeDamage(10))
        dispatch(addToBattleDialogue(`${currentEnemy.name} took 10 poison damage!`))
        dispatch(setPlayerTurn(true))
        dispatch(setEnemyStatusPoints(-1))
    }
}

const checkHeroStatusEffect = () => {
        if (heroStats.status.name === 'Protect' && heroStats.status.points! > 0) {
            dispatch(addToBattleDialogue(`Hero has Protect! No damage taken!`))
            dispatch(setPlayerTurn(true))
            dispatch(setHeroStatusPoints(-1))
            return true
        }
}

useEffect(() => {
    dispatch(setBossType(currentWorld))
    setBossTypeSet(true)
    dispatch(setInBattle(true))
    handleRandomMoney(currentWorld)
}, [])

useEffect(() => {
    if (currentEnemy.name && inBattle) {
        dispatch(addToBattleDialogue(`${currentEnemy.name} appears!`))
    }
    dispatch(setRandomEnemyDamage(handleRandomDamage()))
}, [currentEnemy.name])

  

  useEffect(() => {
      if (bossTypeSet && currentEnemy.health <= 0 ) {
        if (currentWorld == 7 && currentRoom == 'bossRoom') {
            dispatch(setBossBattle(false))
            dispatch(setInBattle(false))
            dispatch(setAfterBattle(true))
            dispatch(setGameOver(true))
            console.log('game is over from defeating boss on world 5!')
        } else {
            if (!inAnimation) {
                dispatch(setAfterBattle(true))
                dispatch(gainExperience(currentEnemy.experience))
                dispatch(setResettingRooms(true))
                dispatch(setRandomRooms())
                dispatch(setBossBattle(false))
                dispatch(setInBattle(false))
                dispatch(restockShop())
                dispatch(resetIdOnAllShopItems())
            }
        }
          
      } else {
          console.log('boss lives!')
      }
  }, [currentEnemy, inAnimation])

  useEffect(() => {
      if (battleTurn === false && currentEnemy.health > 0) {
        if (checkEnemyStatusEffect()) {
            return
        }
        if (checkHeroStatusEffect()) {
            return
        }
              dispatch(heroTakeDamage(randomEnemyDamage))
              dispatch(addToBattleDialogue(`${currentEnemy.name} attacked for ${randomEnemyDamage} damage!`))
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
      <div className={`boss-room-container ${animation.stopAnimation ? 'stop-overlay' : ''} ${animation.fireAnimation ? 'fire-overlay' : ''}  ${animation.thunderAnimation ? 'thunder-overlay' : ''} ${animation.poisonAnimation ? 'poison-overlay' : ''} ${animation.quakeAnimation ? 'quake-overlay' : ''} ${animation.blizzardAnimation ? 'blizzard-overlay' : ''}`}>
          <h1 className='boss-room-name'>{currentEnemy.name.toUpperCase()} (HP: {currentEnemy.health})</h1>
          <img className={`enemy-image ${enemyIsAttacked ? 'enemy-attacked':''} boss-image`} src={currentEnemy.image} alt="" />
          <div className='boss-room-details'>
          
          {battleDialogue.map((text) => (<p>{text}</p>))}
          </div>
          
      </div>
      :
      <AfterBattle name={currentEnemy.name} xp={currentEnemy.experience} money={randomMoney} />
  )
}

export default BossRoom