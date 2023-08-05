import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Enemy.css'
import { goToMapRoom } from './slices/roomSlice'
import { enemyReset } from './slices/enemySlice'
import { gainExperience, heroTakeDamage } from './slices/heroSlice'
import { setPlayerTurn } from './slices/battleSlice'

const Enemy = () => {
    const dispatch = useDispatch()
    const enemyHealth = useSelector(state => state.enemy.health)
    const enemyArmor = useSelector(state => state.enemy.armor)
    const battleTurn = useSelector(state => state.battle.playerTurn)

    useEffect(() => {
        console.log(enemyHealth)
        if (enemyHealth <= 0) {
            console.log('enemy is dead')
            dispatch(gainExperience(10))
            dispatch(enemyReset())
            dispatch(goToMapRoom())

        } else {
            console.log('enemy lives!')
        }
    }, [enemyHealth])

    useEffect(() => {
        if (battleTurn === false) {
            setTimeout(() => {
                dispatch(heroTakeDamage(10))
            dispatch(setPlayerTurn(true))
            }, 1000);
            
        }
    }, [battleTurn])

    return (
        <div id='enemy-container'>
            <h1>Enemy</h1>
            <p>Health: {enemyHealth}</p>
            {/* <p>Armor: {enemyArmor}</p> */}
        </div>
    )
}

export default Enemy