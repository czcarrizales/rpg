import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import { enemyReset, enemyTakeDamage, setEnemyStatusPoints, setEnemyType, setRandomEnemyDamage } from './slices/enemySlice'
import { gainExperience, gainMoney, heroTakeDamage, setHeroStatusPoints} from './slices/heroSlice'
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
    const heroDefense = useSelector((state: RootState) => state.hero.defense)
    const heroArmor = useSelector((state: RootState) => state.hero.armor)
    const heroStats = useSelector((state: RootState) => state.hero)
    const animation = useSelector((state: RootState) => state.animation)
    const [enemyTypeSet, setEnemyTypeSet] = useState(false)
    const [randomMoney, setRandomMoney] = useState(0)


    const handleRandomMoney = (x: number) => {
        const min = 5;
        const multiplier = 10;
        const randomNumber = Math.floor(Math.random() * (multiplier - min) + min);
        setRandomMoney(randomNumber * x)
    }

    const handleRandomDamage = () => {
        const randomDamageNumber = (Math.floor(Math.random() * (currentEnemy.maxAttack! - currentEnemy.minAttack! + 1)) + currentEnemy.minAttack!) - (heroDefense + heroArmor.defense!)
        if (randomDamageNumber > heroDefense + heroArmor.defense!) {
            return randomDamageNumber
        } else {
            return 0
        }
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
            if (currentWorld == 7 && currentRoom == 'bossRoom') {
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
        if (battleTurn === false && currentEnemy.health! > 0) {
                if (checkEnemyStatusEffect()) {
                    return
                }
                if (checkHeroStatusEffect()) {
                    return
                }
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
        <>
        <div className={`enemy-container ${currentWorld === 1 && 'world-1-enemy-background'} ${currentWorld === 2 && 'sea-background'} ${currentWorld === 3 && 'weird-background'} ${currentWorld === 4 && 'scary-background'} ${currentWorld === 5 && 'snowy-background'} ${currentWorld === 6 && 'fire-background'} ${currentWorld === 7 && 'end-background'} ${animation.stopAnimation ? 'stop-overlay' : ''} ${animation.fireAnimation ? 'fire-overlay' : ''}`} >
            <div>
            <h1 className='enemy-name'>{currentEnemy.name?.toUpperCase()}</h1>
            <p className='enemy-health'>HP: {currentEnemy.health}</p>
            {currentEnemy.status?.name && <p>Status: {currentEnemy.status!.name!}</p>}
            </div>
            
            <img className={`enemy-image ${enemyIsAttacked ? 'enemy-attacked':''}`} src={currentEnemy.image!} alt="" />
            <div className='enemy-details'>
            {/* <p>Health: {currentEnemy.health}</p>
            <p>Intent: Attack for {randomEnemyDamage} damage!</p> */}
            {battleDialogue.map((text) => (<p>{text}</p>))}
            </div>
        </div>
        </>
        :
        <AfterBattle name={currentEnemy.name} xp={currentEnemy.experience} money={randomMoney} />
    )
}

export default Enemy