import { createSlice } from "@reduxjs/toolkit";

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

  interface Treasure {
    name: string;
    money: number;
  }
  
  interface HeroState {
    level: number;
    experience: number;
    health: number;
    maxHealth: number;
    mana: number;
    money: number;
    treasure: Treasure[]; // Update this type if necessary
    weapon: Weapon;
    armor: Armor;
    equipment: EquipmentItem[];
    heroIsAttacked: boolean;
  }

const heroSlice = createSlice({
    name: 'hero',
    initialState: {
        level: 1,
        experience: 0,
        health: 1,
        maxHealth: 100,
        mana: 100,
        money: 0,
        treasure: [],
        weapon: {
            type: 'weapon',
            name: 'fists',
            damage: 10
        },
        armor: {
            type: null,
            name: null,
            defense: null
        } ,
        equipment: [

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
        healToFull: (state) => {
            state.health = state.maxHealth
        },
        gainMaxHealth: (state) => {
            state.maxHealth += 50
        },
        takeTreasure: (state, action) => {
            state.treasure.push(action.payload)
        },
        takeWeapon: (state, action) => {
            state.equipment.push(action.payload)
        },
        equipWeapon: (state, action) => {
            state.equipment.push(state.weapon)
            state.weapon = action.payload
            state.equipment = state.equipment.filter(item => item.name !== action.payload.name)
        },
        takeArmor: (state, action) => {
            state.equipment.push(action.payload)
        },
        equipArmor: (state, action) => {
            if (state.armor.name !== null) {
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
        gainLevel: (state) => {
            state.level += 1
        },
        buyItem: (state, action) => {
            state.money -= action.payload
            state.equipment.push(action.payload)
        },
        resetHero: (state) => {
            state.level = 1
            state.health = 100
            state.maxHealth = 100
            state.treasure = []
            state.weapon = {
                type: 'weapon',
                name: 'fists',
                damage: 5
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
        }
    }
})

export const {heroTakeDamage, lowerMana, healToFull, takeTreasure, takeWeapon, equipWeapon, gainExperience, gainLevel, resetExperience, gainMaxHealth, resetHero, takeArmor, equipArmor, setHeroIsAttacked} = heroSlice.actions;
export default heroSlice.reducer