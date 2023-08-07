import { createSlice } from "@reduxjs/toolkit";

const enemyTypes = [
    {
        name: 'rat',
        health: 20,
        attack: 5,
        experience: 10,
        world: 1
    },
    {
        name: 'wolf',
        health: 40,
        attack: 10,
        experience: 20,
        world: 1
    },
    {
        name: 'card knight',
        health: 100,
        attack: 20,
        experience: 50,
        world: 2
    },
    {
        name: 'little witch',
        health: 100,
        attack: 20,
        experience: 50,
        world: 2
    },
    {
        name: 'frost spider',
        health: 150,
        attack: 30,
        experience: 60,
        world: 3
    },
    {
        name: 'ice picker',
        health: 150,
        attack: 30,
        experience: 60,
        world: 3
    }
]

const bosses = [
    {
        name: 'plant king',
        health: 100,
        attack: 20,
        experience: 100,
        world: 1
    },
    {
        name: 'misguided knight',
        health: 100,
        attack: 20,
        experience: 100,
        world: 1
    },
    {
        name: 'jester',
        health: 200,
        attack: 40,
        experience: 100,
        world: 2
    },
    {
        name: 'hazel witch',
        health: 200,
        attack: 40,
        experience: 200,
        world: 2
    },
    {
        name: 'great yeti',
        health: 500,
        attack: 60,
        experience: 300,
        world: 3
    },
    {
        name: 'frozen overlord',
        health: 500,
        attack: 60,
        experience: 300,
        world: 3
    }
]

const getRandomEnemy = (world) => {
    const filteredEnemies = enemyTypes.filter((enemy) => {
        return enemy.world == world
    })
    const randomIndex = Math.floor(Math.random() * filteredEnemies.length)
    const randomEnemy = filteredEnemies[randomIndex]
    return randomEnemy
}

const getRandomBoss = (world) => {
    const filteredBosses = bosses.filter((boss) => {
        return boss.world == world
    })
    const randomIndex = Math.floor(Math.random() * filteredBosses.length)
    const randomBoss = filteredBosses[randomIndex]
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
        setEnemyType: (state, action) => {
            state.currentEnemy = getRandomEnemy(action.payload)
        },
        setBossType: (state, action) => {
            state.currentEnemy = getRandomBoss(action.payload)
        }
    }
})

export const {enemyTakeDamage, enemyReset, setEnemyType, setBossType} = enemySlice.actions;
export default enemySlice.reducer