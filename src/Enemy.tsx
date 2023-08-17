import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import { enemyReset, setEnemyType, setRandomEnemyDamage } from './slices/enemySlice'
import { gainExperience, gainMoney, heroTakeDamage} from './slices/heroSlice'
import { addToBattleDialogue, setInBattle, setPlayerTurn } from './slices/battleSlice'
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
    const inBattle = useSelector((state: RootState) => state.battle.inBattle)
    const randomEnemyDamage = useSelector((state: RootState) => state.enemy.randomEnemyDamage)
    const battleDialogue = useSelector((state: RootState) => state.battle.battleDialogue)
    const [enemyTypeSet, setEnemyTypeSet] = useState(false)
    const [randomMoney, setRandomMoney] = useState(0)

    const handleRandomMoney = (x: number) => {
        const min = 5;
        const multiplier = 10;
        const randomNumber = Math.floor(Math.random() * (multiplier - min) + min);
        setRandomMoney(randomNumber * x)
    }

    const handleRandomDamage = () => {
        const randomDamageNumber = Math.floor(Math.random() * (currentEnemy.maxAttack! - currentEnemy.minAttack! + 1)) + currentEnemy.minAttack!;
        return randomDamageNumber
    }

    const handleSetInBattle = () => {
        dispatch(setInBattle(true))
    }

    useEffect(() => {
        dispatch(setEnemyType(currentWorld))
        setEnemyTypeSet(true)
        handleSetInBattle()
        handleRandomMoney(currentWorld)
        
    }, [])

    useEffect(() => {
        if (currentEnemy.name && inBattle) {
            dispatch(addToBattleDialogue(`${currentEnemy.name} appears!`))
        }
        dispatch(setRandomEnemyDamage(handleRandomDamage()))
    }, [currentEnemy.name])

    useEffect(() => {
        if (enemyTypeSet && currentEnemy.health! <= 0 ) {
            if (currentWorld == 5 && currentRoom == 'bossRoom') {
                console.log('game is over!')
            } else if (!inAnimation) {
                    dispatch(setAfterBattle(true))
                    console.log(afterBattle, 'after animation ends')
                    dispatch(gainExperience(currentEnemy.experience))
                    dispatch(gainMoney(randomMoney))
                    dispatch(setInBattle(false))
            }
        } else {
            console.log('enemy lives!')
        }
    }, [currentEnemy, inAnimation])

    useEffect(() => {
        if (enemyTypeSet && afterBattle === false && currentEnemy.health! <= 0) {
            setEnemyTypeSet(false)
            dispatch(goToMapRoom())
            dispatch(setInRoom(false))
            dispatch(enemyReset())
        }
    }, [afterBattle])

    useEffect(() => {
        if (battleTurn === false && currentEnemy.health! > 0) {
                dispatch(heroTakeDamage(randomEnemyDamage))
                dispatch(addToBattleDialogue(`${currentEnemy.name} attacked for ${randomEnemyDamage} damage!`))
                heroTakeDamageFlash(dispatch)
                setTimeout(() => {
                    dispatch(setPlayerTurn(true))
                    dispatch(setRandomEnemyDamage(handleRandomDamage()))
                }, 500);
                
        } else {
            dispatch(setPlayerTurn(true))
        }
    }, [battleTurn])

    return (
        !afterBattle
        ?
        <div className={`enemy-container ${currentWorld === 1 && 'world-1-enemy-background'} ${currentWorld === 2 && 'world-2-enemy-background'} ${currentWorld === 3 && 'world-3-enemy-background'} ${currentWorld === 4 && 'world-4-enemy-background'} ${currentWorld === 5 && 'world-5-enemy-background'} }`}>
            <div>
            <h1 className='enemy-name'>{currentEnemy.name?.toUpperCase()}</h1>
            <p className='enemy-health'>HP: {currentEnemy.health}</p>
            </div>
            
            <img className={`enemy-image ${enemyIsAttacked ? 'enemy-attacked':''}`} src={currentEnemy.image!} alt="" />
            <div className='enemy-details'>
            {/* <p>Health: {currentEnemy.health}</p>
            <p>Intent: Attack for {randomEnemyDamage} damage!</p> */}
            {battleDialogue.map((text) => (<p>{text}</p>))}
            </div>
        </div>
        :
        <AfterBattle name={currentEnemy.name} xp={currentEnemy.experience} money={randomMoney} />
    )
}

export default Enemy