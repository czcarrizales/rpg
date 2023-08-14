import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Weapon {
    type: string | null;
    name: string | null;
    damage: number | null;
    image: string | undefined;
  }
  
  interface Armor {
    type: string | null;
    name: string | null;
    defense: number | null;
    image: string | undefined;
  }
  
  type EquipmentItem = Weapon | Armor;

  export interface Spell {
    type: string | null;
    name: string | null;
    points: number | null;
    mana: number | null;
  }

  interface Treasure {
    id: string;
    type: string;
    name: string;
    money: number;
    image: string;
  }

  export interface Potion {
    id: string;
    type: string;
    name: string;
    money: number;
    points: number;
    image: string;
    use: () => void;
  }

  type BackpackItem = Treasure | Potion;
  
  interface HeroState {
    level: number;
    experience: number;
    experienceToLevelUp: number;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
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
        experienceToLevelUp: 10,
        health: 50,
        maxHealth: 50,
        mana: 20,
        maxMana: 20,
        attack: 5,
        defense: 0,
        money: 0,
        backpack: [],
        weapon: {
            type: null,
            name: null,
            damage: null,
            image: undefined
        },
        armor: {
            type: null,
            name: null,
            defense: null,
            image: undefined
        } ,
        equipment: [

        ],
        spells: [
            
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
        raiseMana: (state, action) => {
            state.mana += action.payload
        },
        setMana: (state, action) => {
            state.mana = action.payload
        },
        raiseHeroHealth: (state, action) => {
            state.health += action.payload
        },
        healToFull: (state) => {
            state.health = state.maxHealth
        },
        gainMaxHealth: (state, action) => {
            state.maxHealth += action.payload
        },
        gainMaxMana: (state, action) => {
            state.maxMana += action.payload
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
        gainAttack: (state, action) => {
            state.attack += action.payload
        },
        gainDefense: (state, action) => {
            state.defense += action.payload
        },
        learnSpell: (state, action) => {
            state.spells.push(action.payload)
        },
        buyItemForBackpack: (state, action) => {
            const {money, item} = action.payload;
            state.money -= money
            state.backpack.push(item)
        },
        sellItemFromBackpack: (state, action) => {
            state.backpack = state.backpack.filter(item => item.id !== action.payload.id)
        },
        resetHero: (state) => {
            state.level = 1
            state.health = 50
            state.maxHealth = 50
            state.mana = 20
            state.maxMana = 20
            state.attack = 5
            state.defense = 0
            state.backpack = []
            state.weapon = {
                type: null,
                name: null,
                damage: null,
                image: undefined
            }
            state.armor = {
                type: null,
                name: null,
                defense: null,
                image: undefined
            }
            state.equipment = []
        },
        setHeroIsAttacked: (state, action) => {
            state.heroIsAttacked = action.payload
        },
    }
})

export const {heroTakeDamage, lowerMana, healToFull, takeTreasure, takeWeapon, equipWeapon, gainExperience, setExperienceToLevelUp, gainLevel, resetExperience, gainMaxHealth, gainMoney, resetHero, takeArmor, equipArmor, setHeroIsAttacked, raiseHeroHealth, buyItemForBackpack, gainAttack, gainDefense, gainMaxMana, raiseMana, sellItemFromBackpack, setMana, learnSpell} = heroSlice.actions;
export default heroSlice.reducer