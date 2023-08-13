import { createSlice } from "@reduxjs/toolkit";

const allShopItems = [
    {
        name: 'health potion',
        money: 20,
        points: 20,
        type: 'USABLE',
        action: 'RAISEHEALTH'
    },
    {
        name: 'mana potion',
        money: 20,
        points: 20,
        type: 'USABLE',
        action: 'RAISEMANA'
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
        }
    }
})

export const {setInShop} = shopSlice.actions;
export default shopSlice.reducer;