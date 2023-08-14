import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

const allShopItems = [
    {
        id: uuidv4(),
        name: 'health potion',
        money: 20,
        points: 20,
        type: 'USABLE',
        action: 'RAISEHEALTH',
        image: '/images/items/potions/health-potion.png'
    },
    {
        id: uuidv4(),
        name: 'mana potion',
        money: 20,
        points: 20,
        type: 'USABLE',
        action: 'RAISEMANA',
        image: '/images/items/potions/mana-potion.png'
    }
]

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shopItems: allShopItems,
        inShop: false
    },
    reducers: {
        setInShop: (state, action) => {
            state.inShop = action.payload
        },
        removeFromShop: (state, action) => {
            state.shopItems = state.shopItems.filter(item => item.id !== action.payload)
        },
        restockShop: (state) => {
            state.shopItems = allShopItems;
        },
        resetIdOnAllShopItems: (state) => {
            state.shopItems = state.shopItems.map(item => ({...item, id: uuidv4()}))
        }
    }
})

export const {setInShop, removeFromShop, resetIdOnAllShopItems, restockShop} = shopSlice.actions;
export default shopSlice.reducer;