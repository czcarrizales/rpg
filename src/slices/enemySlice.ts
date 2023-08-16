import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const enemyTypes = [
    {
        name: 'plant',
        health: 10,
        minAttack: 1,
        maxAttack: 5,
        experience:2,
        world: 1,
        image: '/images/enemies/world1/plant.png'
    },
    {
        name: 'goblin',
        health: 20,
        minAttack: 3,
        maxAttack: 6,
        attack: 10,
        experience: 4,
        world: 1,
        image: '/images/enemies/world1/goblin.png'
    },
    {
        name: 'forest wolf',
        health: 20,
        minAttack: 3,
        maxAttack: 6,
        attack: 10,
        experience: 4,
        world: 1,
        image: '/images/enemies/world1/basicWolf.png'
    },
    {
        name: 'snake',
        health: 20,
        minAttack: 3,
        maxAttack: 6,
        attack: 10,
        experience: 4,
        world: 1,
        image: '/images/enemies/world1/snake.png'
    },
    {
        name: 'pumpkin',
        health: 30,
        minAttack: 7,
        maxAttack: 10,
        experience: 8,
        world: 2,
        image: '/images/enemies/world2/pumpkinEnemy.png'
    },
    {
        name: 'reaper',
        health: 40,
        minAttack: 11,
        maxAttack: 14,
        experience: 12,
        world: 2,
        image: '/images/enemies/world2/reaper.png'
    },
    {
        name: 'zombie',
        health: 40,
        minAttack: 11,
        maxAttack: 14,
        experience: 12,
        world: 2,
        image: '/images/enemies/world2/zombie.png'
    },
    {
        name: 'twin eyes',
        health: 40,
        minAttack: 11,
        maxAttack: 14,
        experience: 12,
        world: 2,
        image: '/images/enemies/world2/eyes.png'
    },
    {
        name: 'ice wolf',
        health: 150,
        minAttack: 20,
        maxAttack: 25,
        experience: 60,
        world: 3,
        image: '/images/enemies/world3/iceWolf.png'
    },
    {
        name: 'frost orc',
        health: 150,
        minAttack: 25,
        maxAttack: 30,
        experience: 60,
        world: 3,
        image: '/images/enemies/world3/iceOrc.png'
    },
    {
        name: 'demon',
        health: 200,
        minAttack: 25,
        maxAttack: 30,
        experience: 80,
        world: 4,
        image: '/images/enemies/world4/demon.png'
    },
    {
        name: 'fire blob',
        health: 200,
        minAttack: 25,
        maxAttack: 30,
        experience: 80,
        world: 4,
        image: '/images/enemies/world4/fireBlob.png'
    },
    {
        name: 'lava bird',
        health: 200,
        minAttack: 25,
        maxAttack: 30,
        experience: 80,
        world: 4,
        image: '/images/enemies/world4/lavaBird.png'
    },
    {
        name: 'hell soul',
        health: 200,
        minAttack: 25,
        maxAttack: 30,
        experience: 80,
        world: 4,
        image: '/images/enemies/world4/soul.png'
    },
    {
        name: 'disciple',
        health: 250,
        minAttack: 25,
        maxAttack: 30,
        experience: 100,
        world: 5,
        image: '/images/enemies/world5/disciple.png'
    },
    {
        name: 'agony',
        health: 250,
        minAttack: 25,
        maxAttack: 30,
        experience: 100,
        world: 5,
        image: '/images/enemies/world5/agony.png'
    }
]

const bosses = [
    {
        name: 'dragon',
        health: 60,
        minAttack: 12,
        maxAttack: 15,
        experience: 40,
        world: 1,
        image: '/images/bosses/dragon.png'
    },
    {
        name: 'minotaur',
        health: 50,
        minAttack: 10,
        maxAttack: 13,
        experience: 30,
        world: 1,
        image: '/images/bosses/minotaur-boss.png'
    },
    {
        name: 'the eye',
        health: 100,
        minAttack: 25,
        maxAttack: 30,
        experience: 60,
        world: 2,
        image: '/images/bosses/creepyEye.png'
    },
    {
        name: 'monster',
        health: 100,
        minAttack: 25,
        maxAttack: 30,
        experience: 200,
        world: 2,
        image: '/images/bosses/monster.png'
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
        world: 3,
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