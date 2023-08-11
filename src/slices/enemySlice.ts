import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const enemyTypes = [
    {
        name: 'blob',
        health: 20,
        attack: 5,
        experience: 10,
        world: 1,
        image: '/images/enemies/blob.png'
    },
    {
        name: 'goblin',
        health: 40,
        attack: 10,
        experience: 20,
        world: 1,
        image: '/images/enemies/goblin.png'
    },
    {
        name: 'skeleton',
        health: 100,
        attack: 20,
        experience: 50,
        world: 2,
        image: '/images/enemies/skeleton.png'
    },
    {
        name: 'witch',
        health: 100,
        attack: 20,
        experience: 50,
        world: 2,
        image: '/images/enemies/witch.png'
    },
    {
        name: 'frost spider',
        health: 150,
        attack: 30,
        experience: 60,
        world: 3,
        image: null
    },
    {
        name: 'ice picker',
        health: 150,
        attack: 30,
        experience: 60,
        world: 3,
        image: null
    },
    {
        name: 'lava golem',
        health: 200,
        attack: 40,
        experience: 80,
        world: 4,
        image: null
    },
    {
        name: 'fire wisp',
        health: 200,
        attack: 40,
        experience: 80,
        world: 4,
        image: null
    },
    {
        name: 'vicious dog',
        health: 250,
        attack: 50,
        experience: 100,
        world: 5,
        image: null
    },
    {
        name: 'shadow of doubt',
        health: 250,
        attack: 50,
        experience: 100,
        world: 5,
        image: null
    }
]

const bosses = [
    {
        name: 'giant spider',
        health: 100,
        attack: 20,
        experience: 100,
        world: 1,
        image: '/images/bosses/spider-boss.png'
    },
    {
        name: 'minotaur',
        health: 100,
        attack: 20,
        experience: 100,
        world: 1,
        image: '/images/bosses/minotaur-boss.png'
    },
    {
        name: 'jester',
        health: 200,
        attack: 40,
        experience: 100,
        world: 2,
        image: null
    },
    {
        name: 'witch',
        health: 200,
        attack: 40,
        experience: 200,
        world: 2,
        image: null
    },
    {
        name: 'great yeti',
        health: 500,
        attack: 60,
        experience: 300,
        world: 3,
        image: null
    },
    {
        name: 'frozen overlord',
        health: 500,
        attack: 60,
        experience: 400,
        world: 4,
        image: null
    },
    {
        name: 'blaze dragon',
        health: 750,
        attack: 80,
        experience: 400,
        world: 4,
        image: null
    },
    {
        name: 'magma horror',
        health: 750,
        attack: 80,
        experience: 400,
        world: 4,
        image: null
    },
    {
        name: 'the true mind',
        health: 1000,
        attack: 100,
        experience: 500,
        world: 5,
        image: null
    }
]

interface Enemy {
    name: string | null;
    health: number | null;
    attack: number | null;
    experience: number | null;
    world: number | null;
    image: string | null;
}

const getRandomEnemy = (world: number) => {
    const filteredEnemies = enemyTypes.filter((enemy) => {
        return enemy.world == world
    })
    const randomIndex = Math.floor(Math.random() * filteredEnemies.length)
    const randomEnemy = filteredEnemies[randomIndex]
    return randomEnemy
}

const getRandomBoss = (world: number) => {
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
            attack: null,
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
        bossIsAttacked: false
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
        }
    }
})



export const {enemyTakeDamage, enemyReset, setEnemyType, setBossType, setEnemyIsAttacked, setBossIsAttacked} = enemySlice.actions;
export default enemySlice.reducer