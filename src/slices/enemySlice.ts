import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allEnemiesPool } from "../enemyPool";
import { allBossesPool } from "../enemyPool";

interface Enemy {
    name: string | null;
    health: number | null;
    minAttack: number | null;
    maxAttack: number | null;
    experience: number | null;
    world: number | null;
    image: string | null;
}

const getRandomEnemy = (world: number) => {
    const filteredEnemies = allEnemiesPool.filter((enemy) => {
        return enemy.world == world
    })
    const randomIndex = Math.floor(Math.random() * filteredEnemies.length)
    const randomEnemy = filteredEnemies[randomIndex]
    return randomEnemy
}

const getRandomBoss = (world: number) => {
    const filteredBosses = allBossesPool.filter((boss) => {
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
            minAttack: null,
            maxAttack: null,
            experience: null,
            world: null,
            image: null
        } as Enemy,
        currentBoss: {
            name: null,
            health: null,
            attack: null,
            experience: null,
            world: null,
            image: null
        },
        enemyIsAttacked: false,
        bossIsAttacked: false,
        randomEnemyDamage: 0
    },
    reducers: {
        enemyTakeDamage: (state, action: PayloadAction<number>) => {
            if (state.currentEnemy.health !== null) {
                state.currentEnemy.health -= action.payload;
              }
        },
        enemyReset: (state) => {
            state.currentEnemy.health = 100
        },
        setEnemyType: (state, action) => {
            state.currentEnemy = getRandomEnemy(action.payload)
        },
        setBossType: (state, action) => {
            state.currentEnemy = getRandomBoss(action.payload)
        },
        setEnemyIsAttacked: (state, action) => {
            state.enemyIsAttacked = action.payload
        },
        setBossIsAttacked: (state, action) => {
            state.bossIsAttacked = action.payload
        },
        setRandomEnemyDamage: (state, action) => {
            state.randomEnemyDamage = action.payload
        }
    }
})



export const {enemyTakeDamage, enemyReset, setEnemyType, setBossType, setEnemyIsAttacked, setBossIsAttacked, setRandomEnemyDamage} = enemySlice.actions;
export default enemySlice.reducer