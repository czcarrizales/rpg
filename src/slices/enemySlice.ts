import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const enemyTypes = [
    {
        name: 'slime',
        health: 10,
        minAttack: 1,
        maxAttack: 5,
        experience: 5,
        world: 1,
        image: '/images/enemies/slime.png'
    },
    {
        name: 'goblin',
        health: 20,
        minAttack: 5,
        maxAttack: 10,
        attack: 10,
        experience: 10,
        world: 1,
        image: '/images/enemies/goblin.png'
    },
    {
        name: 'pumpkin',
        health: 30,
        minAttack: 10,
        maxAttack: 15,
        experience: 15,
        world: 2,
        image: '/images/enemies/pumpkinEnemy.png'
    },
    {
        name: 'skeleton',
        health: 40,
        minAttack: 15,
        maxAttack: 20,
        experience: 20,
        world: 2,
        image: '/images/enemies/skeleton.png'
    },
    {
        name: 'ice wolf',
        health: 150,
        minAttack: 20,
        maxAttack: 25,
        experience: 60,
        world: 3,
        image: '/images/enemies/iceWolf.png'
    },
    {
        name: 'frost orc',
        health: 150,
        minAttack: 25,
        maxAttack: 30,
        experience: 60,
        world: 3,
        image: '/images/enemies/iceOrc.png'
    },
    {
        name: 'lava golem',
        health: 200,
        minAttack: 25,
        maxAttack: 30,
        experience: 80,
        world: 4,
        image: null
    },
    {
        name: 'fire wisp',
        health: 200,
        minAttack: 25,
        maxAttack: 30,
        experience: 80,
        world: 4,
        image: null
    },
    {
        name: 'disciple',
        health: 250,
        minAttack: 25,
        maxAttack: 30,
        experience: 100,
        world: 5,
        image: '/images/enemies/disciple.png'
    },
    {
        name: 'agony',
        health: 250,
        minAttack: 25,
        maxAttack: 30,
        experience: 100,
        world: 5,
        image: '/images/enemies/agony.png'
    }
]

const bosses = [
    {
        name: 'dragon',
        health: 50,
        minAttack: 25,
        maxAttack: 30,
        experience: 30,
        world: 1,
        image: '/images/bosses/dragon.png'
    },
    {
        name: 'minotaur',
        health: 50,
        minAttack: 25,
        maxAttack: 30,
        experience: 30,
        world: 1,
        image: '/images/bosses/minotaur-boss.png'
    },
    {
        name: 'witch',
        health: 100,
        minAttack: 25,
        maxAttack: 30,
        experience: 60,
        world: 2,
        image: '/images/bosses/witch.png'
    },
    {
        name: 'giant spider',
        health: 100,
        minAttack: 25,
        maxAttack: 30,
        experience: 200,
        world: 2,
        image: '/images/bosses/spider-boss.png'
    },
    {
        name: 'ice dancer',
        health: 150,
        minAttack: 25,
        maxAttack: 30,
        experience: 300,
        world: 3,
        image: '/images/bosses/iceDancer.png'
    },
    {
        name: 'ice golem',
        health: 150,
        minAttack: 25,
        maxAttack: 30,
        experience: 300,
        world: 4,
        image: '/images/bosses/iceGolem.png'
    },
    {
        name: 'blaze dragon',
        health: 750,
        minAttack: 25,
        maxAttack: 30,
        experience: 400,
        world: 4,
        image: null
    },
    {
        name: 'magma horror',
        health: 750,
        minAttack: 25,
        maxAttack: 30,
        experience: 400,
        world: 4,
        image: null
    },
    {
        name: 'Oblivion',
        health: 300,
        minAttack: 25,
        maxAttack: 30,
        experience: 500,
        world: 5,
        image: '/images/bosses/finalBoss.png'
    }
]

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