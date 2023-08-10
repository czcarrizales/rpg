import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import { enemyReset, setEnemyType } from './slices/enemySlice'
import { gainExperience, heroTakeDamage, setHeroIsAttacked } from './slices/heroSlice'
import { setInBattle, setPlayerTurn } from './slices/battleSlice'
import { RootState } from './store'
import './Enemy.css'

const Enemy = () => {
    const dispatch = useDispatch()
    const currentEnemy = useSelector((state: RootState) => state.enemy.currentEnemy)
    const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
    const currentRoom = useSelector((state: RootState) => state.room.currentRoom)
    const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
    const enemyIsAttacked = useSelector((state: RootState) => state.enemy.enemyIsAttacked)
    const [enemyTypeSet, setEnemyTypeSet] = useState(false)

    const handleSetInBattle = () => {
        dispatch(setInBattle(true))
    }

    useEffect(() => {
        dispatch(setEnemyType(currentWorld))
        setEnemyTypeSet(true)
        handleSetInBattle()
    }, [])

    useEffect(() => {
        if (enemyTypeSet && currentEnemy.health! <= 0 ) {
            if (currentWorld == 5 && currentRoom == 'bossRoom') {
                console.log('game is over!')
            } else {
                setEnemyTypeSet(false)
                dispatch(gainExperience(currentEnemy.experience))
                dispatch(enemyReset())
                dispatch(goToMapRoom())
                dispatch(setInRoom(false))
                dispatch(setInBattle(false))
            }
            
        } else {
            console.log('enemy lives!')
        }
    }, [currentEnemy, enemyTypeSet])

    useEffect(() => {
        if (battleTurn === false && currentEnemy.health! > 0) {
            setTimeout(() => {
              dispatch(heroTakeDamage(currentEnemy.attack));
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
              
              dispatch(setPlayerTurn(true));
            }, 500); // First flash start after 500 milliseconds
            
        } else {
            dispatch(setPlayerTurn(true))
        }
    }, [battleTurn])

    return (
        <div className={`enemy-container ${enemyIsAttacked ? 'enemy-attacked':''}`}>
            <h1>{currentEnemy.name}</h1>
            <p>Health: {currentEnemy.health}</p>
            <p>Intent: Attack for {currentEnemy.attack} damage!</p>
            {/* <p>Armor: {enemyArmor}</p> */}
        </div>
    )
}

export default Enemy