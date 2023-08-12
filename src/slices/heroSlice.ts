import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Weapon {
    type: string | null;
    name: string | null;
    damage: number | null;
  }
  
  interface Armor {
    type: string | null;
    name: string | null;
    defense: number | null;
  }
  
  type EquipmentItem = Weapon | Armor;

  interface Spell {
    type: string | null;
    name: string | null;
    number: number | null;
    mana: number | null;
  }

  interface Treasure {
    type: string;
    name: string;
    money: number;
  }

  interface Potion {
    type: string;
    name: string;
    money: number;
    points: number;
  }

  type BackpackItem = Treasure | Potion;
  
  interface HeroState {
    level: number;
    experience: number;
    experienceToLevelUp: number;
    health: number;
    maxHealth: number;
    mana: number;
    attack: number;
    defense: number;
    money: number;
    backpack: BackpackItem[];
    weapon: Weapon;
    armor: Armor;
    equipment: EquipmentItem[];
    heroIsAttacked: boolean;
    spells: Spell[];
  }

const heroSlice = createSlice({
    name: 'hero',
    initialState: {
        level: 1,
        experience: 0,
        experienceToLevelUp: 50,
        health: 50,
        maxHealth: 50,
        mana: 100,
        attack: 5,
        defense: 0,
        money: 0,
        backpack: [],
        weapon: {
            type: null,
            name: null,
            damage: null
        },
        armor: {
            type: null,
            name: null,
            defense: null
        } ,
        equipment: [

        ],
        spells: [
            {
                type: 'healing',
                name: 'small heal',
                number: 20,
                mana: 20
            }
        ],
        heroIsAttacked: false
    } as HeroState,
    reducers: {
        heroTakeDamage: (state, action) => {
            const armorDefense = state.armor.defense ?? 0;
            const totalDamage = action.payload - armorDefense
            if (totalDamage > 0) {
                state.health -= totalDamage
            }
        },
        lowerMana: (state, action) => {
            state.mana -= action.payload
        },
        raiseHeroHealth: (state, action) => {
            state.health += action.payload
        },
        healToFull: (state) => {
            state.health = state.maxHealth
        },
        gainMaxHealth: (state) => {
            state.maxHealth += 50
        },
        takeTreasure: (state, action: PayloadAction<Treasure>) => {
            state.backpack.push(action.payload)
        },
        takeWeapon: (state, action) => {
            state.equipment.push(action.payload)
        },
        equipWeapon: (state, action) => {
            if (state.weapon.name) {
                state.equipment.push(state.weapon)
            }
            state.weapon = action.payload
            state.equipment = state.equipment.filter(item => item.name !== action.payload.name)
        },
        takeArmor: (state, action) => {
            state.equipment.push(action.payload)
        },
        equipArmor: (state, action) => {
            if (state.armor.name) {
            state.equipment.push(state.armor)
            }
            state.armor = action.payload
            state.equipment = state.equipment.filter(item => item.name !== action.payload.name)
        },
        gainExperience: (state, action) => {
            state.experience += action.payload
        },
        resetExperience: (state) => {
            state.experience = 0
        },
        setExperienceToLevelUp: (state, action) => {
            state.experienceToLevelUp = action.payload
        },
        gainMoney: (state, action) => {
            state.money += action.payload
        },
        gainLevel: (state) => {
            state.level += 1
        },
        buyItemForBackpack: (state, action) => {
            const {money, item} = action.payload;
            state.money -= money
            state.backpack.push(item)
        },
        resetHero: (state) => {
            state.level = 1
            state.health = 100
            state.maxHealth = 100
            state.backpack = []
            state.weapon = {
                type: 'weapon',
                name: 'fists',
                damage: 10
            }
            state.armor = {
                type: null,
                name: null,
                defense: null
            }
            state.equipment = []
        },
        setHeroIsAttacked: (state, action) => {
            state.heroIsAttacked = action.payload
        },
    }
})

export const {heroTakeDamage, lowerMana, healToFull, takeTreasure, takeWeapon, equipWeapon, gainExperience, setExperienceToLevelUp, gainLevel, resetExperience, gainMaxHealth, gainMoney, resetHero, takeArmor, equipArmor, setHeroIsAttacked, raiseHeroHealth, buyItemForBackpack} = heroSlice.actions;
export default heroSlice.reducer