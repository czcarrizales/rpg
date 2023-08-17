import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const enemyTypes = [
    {
        name: 'Poison Plant',
        health: 10,
        minAttack: 1,
        maxAttack: 2,
        experience:2,
        world: 1,
        image: '/images/enemies/world1/plant.png'
    },
    {
        name: 'Goblin',
        health: 20,
        minAttack: 1,
        maxAttack: 4,
        experience: 4,
        world: 1,
        image: '/images/enemies/world1/goblin.png'
    },
    {
        name: 'Wolf',
        health: 20,
        minAttack: 3,
        maxAttack: 5,
        experience: 5,
        world: 1,
        image: '/images/enemies/world1/basicWolf.png'
    },
    {
        name: 'Snake',
        health: 15,
        minAttack: 2,
        maxAttack: 4,
        experience: 3,
        world: 1,
        image: '/images/enemies/world1/snake.png'
    },
    {
        name: 'Pumpkin',
        health: 20,
        minAttack: 4,
        maxAttack: 6,
        experience: 8,
        world: 2,
        image: '/images/enemies/world2/pumpkinEnemy.png'
    },
    {
        name: 'Reaper',
        health: 40,
        minAttack: 6,
        maxAttack: 8,
        experience: 12,
        world: 2,
        image: '/images/enemies/world2/reaper.png'
    },
    {
        name: 'Zombie',
        health: 40,
        minAttack: 5,
        maxAttack: 7,
        experience: 12,
        world: 2,
        image: '/images/enemies/world2/zombie.png'
    },
    {
        name: 'Twin Eyes',
        health: 20,
        minAttack: 4,
        maxAttack: 8,
        experience: 12,
        world: 2,
        image: '/images/enemies/world2/eyes.png'
    },
    {
        name: 'Snow Wolf',
        health: 35,
        minAttack: 5,
        maxAttack: 10,
        experience: 60,
        world: 3,
        image: '/images/enemies/world3/iceWolf.png'
    },
    {
        name: 'Frost Orc',
        health: 50,
        minAttack: 4,
        maxAttack: 15,
        experience: 60,
        world: 3,
        image: '/images/enemies/world3/iceOrc.png'
    },
    {
        name: 'Demon',
        health: 40,
        minAttack: 5,
        maxAttack: 10,
        experience: 80,
        world: 4,
        image: '/images/enemies/world4/demon.png'
    },
    {
        name: 'Fire Blob',
        health: 30,
        minAttack: 4,
        maxAttack: 9,
        experience: 80,
        world: 4,
        image: '/images/enemies/world4/fireBlob.png'
    },
    {
        name: 'Lava Bird',
        health: 25,
        minAttack: 7,
        maxAttack: 11,
        experience: 80,
        world: 4,
        image: '/images/enemies/world4/lavaBird.png'
    },
    {
        name: 'Hell Soul',
        health: 20,
        minAttack: 6,
        maxAttack: 8,
        experience: 80,
        world: 4,
        image: '/images/enemies/world4/soul.png'
    },
    {
        name: 'Disciple',
        health: 60,
        minAttack: 10,
        maxAttack: 12,
        experience: 100,
        world: 5,
        image: '/images/enemies/world5/disciple.png'
    },
    {
        name: 'Agony',
        health: 80,
        minAttack: 13,
        maxAttack: 15,
        experience: 100,
        world: 5,
        image: '/images/enemies/world5/agony.png'
    }
]

const bosses = [
    {
        name: 'Dragon',
        health: 60,
        minAttack: 12,
        maxAttack: 15,
        experience: 40,
        world: 1,
        image: '/images/bosses/dragon.png'
    },
    {
        name: 'Minotaur',
        health: 50,
        minAttack: 10,
        maxAttack: 13,
        experience: 30,
        world: 1,
        image: '/images/bosses/minotaur-boss.png'
    },
    {
        name: 'The Eye',
        health: 100,
        minAttack: 13,
        maxAttack: 18,
        experience: 60,
        world: 2,
        image: '/images/bosses/creepyEye.png'
    },
    {
        name: 'Abomination',
        health: 120,
        minAttack: 15,
        maxAttack: 19,
        experience: 200,
        world: 2,
        image: '/images/bosses/monster.png'
    },
    {
        name: 'Ice Dancer',
        health: 150,
        minAttack: 20,
        maxAttack: 4,
        experience: 300,
        world: 3,
        image: '/images/bosses/iceDancer.png'
    },
    {
        name: 'Ice Golem',
        health: 150,
        minAttack: 25,
        maxAttack: 30,
        experience: 300,
        world: 3,
        image: '/images/bosses/iceGolem.png'
    },
    {
        name: 'Blaze Dragon',
        health: 200,
        minAttack: 30,
        maxAttack: 34,
        experience: 400,
        world: 4,
        image: null
    },
    {
        name: 'Magma Horror',
        health: 200,
        minAttack: 31,
        maxAttack: 35,
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