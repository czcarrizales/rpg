import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import { enemyReset, setEnemyType } from './slices/enemySlice'
import { gainExperience, heroTakeDamage} from './slices/heroSlice'
import { setInBattle, setPlayerTurn } from './slices/battleSlice'
import { RootState } from './store'
import { heroTakeDamageFlash } from './utilities'
import './Enemy.css'
import AfterBattle from './AfterBattle'
import { setAfterBattle } from './slices/gameSlice'

const Enemy = () => {
    const dispatch = useDispatch()
    const currentEnemy = useSelector((state: RootState) => state.enemy.currentEnemy)
    const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
    const currentRoom = useSelector((state: RootState) => state.room.currentRoom)
    const battleTurn = useSelector((state: RootState) => state.battle.playerTurn)
    const enemyIsAttacked = useSelector((state: RootState) => state.enemy.enemyIsAttacked)
    const inAnimation = useSelector((state: RootState) => state.game.inAnimation)
    const afterBattle = useSelector((state: RootState) => state.game.afterBattle)
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
        console.log('setting up useeffect')
        if (enemyTypeSet && currentEnemy.health! <= 0 ) {
            if (currentWorld == 5 && currentRoom == 'bossRoom') {
                console.log('game is over!')
            } else if (!inAnimation) {
                    dispatch(setAfterBattle(true))
                    console.log(afterBattle, 'after animation ends')
                    dispatch(gainExperience(currentEnemy.experience))
                    dispatch(setInBattle(false))
            }
        } else {
            console.log('enemy lives!')
        }
    }, [currentEnemy, inAnimation])

    useEffect(() => {
        console.log('afterBattle changed')
        if (enemyTypeSet && afterBattle === false && currentEnemy.health! <= 0) {
            setEnemyTypeSet(false)
            dispatch(goToMapRoom())
            dispatch(setInRoom(false))
            dispatch(enemyReset())
        }
    }, [afterBattle])

    useEffect(() => {
        if (battleTurn === false && currentEnemy.health! > 0) {
                dispatch(heroTakeDamage(currentEnemy.attack))
                heroTakeDamageFlash(dispatch)
            dispatch(setPlayerTurn(true))
        } else {
            dispatch(setPlayerTurn(true))
        }
    }, [battleTurn])

    return (
        !afterBattle
        ?
        <div className={`enemy-container }`}>
            <h1 className='enemy-name'>{currentEnemy.name?.toUpperCase()}</h1>
            <img className={`enemy-image ${enemyIsAttacked ? 'enemy-attacked':''}`} src={currentEnemy.image!} alt="" />
            <div className='enemy-details'>
            <p>Health: {currentEnemy.health}</p>
            <p>Intent: Attack for {currentEnemy.attack} damage!</p>
            </div>
        </div>
        :
        <AfterBattle name={currentEnemy.name} xp={currentEnemy.experience} />
    )
}

export default Enemy