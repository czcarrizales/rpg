import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import { enemyReset, setEnemyType } from './slices/enemySlice'
import { gainExperience, heroTakeDamage} from './slices/heroSlice'
import { setInBattle, setPlayerTurn } from './slices/battleSlice'
import { RootState } from './store'
import './Enemy.css'
import { heroTakeDamageFlash } from './utilities'

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
                dispatch(heroTakeDamage(currentEnemy.attack))
                heroTakeDamageFlash(dispatch)
            dispatch(setPlayerTurn(true))
            }, 500);
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