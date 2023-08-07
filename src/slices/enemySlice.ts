import { createSlice } from "@reduxjs/toolkit";

const enemyTypes = [
    {
        name: 'rat',
        health: 20,
        attack: 5,
        experience: 10
    },
    {
        name: 'wolf',
        health: 40,
        attack: 10,
        experience: 20
    },
    {
        name: 'ogre',
        health: 100,
        attack: 20,
        experience: 50
    },
]

const bosses = [
    {
        name: 'black knight',
        health: 200,
        attack: 20
    },
    {
        name: 'hazel witch',
        health: 400,
        attack: 40
    }
]

const getRandomEnemy = () => {
    const randomIndex = Math.floor(Math.random() * enemyTypes.length)
    const randomEnemy = enemyTypes[randomIndex]
    return randomEnemy
}

const getRandomBoss = () => {
    const randomIndex = Math.floor(Math.random() * bosses.length)
    const randomBoss = bosses[randomIndex]
    return randomBoss
}

const enemySlice = createSlice({
    name: 'enemy',
    initialState: {
        currentEnemy: {
            name: null,
            health: null,
            attack: null
        },
        currentBoss: {
            name: null,
            health: null,
            attack: null
        }
    },
    reducers: {
        enemyTakeDamage: (state, action) => {
            state.currentEnemy.health -= action.payload
        },
        enemyReset: (state) => {
            state.health = 100
        },
        setEnemyType: (state) => {
            state.currentEnemy = getRandomEnemy()
        },
        setBossType: (state) => {
            state.currentBoss = getRandomBoss()
        }
    }
})

export const {enemyTakeDamage, enemyReset, setEnemyType, setBossType} = enemySlice.actions;
export default enemySlice.reducer