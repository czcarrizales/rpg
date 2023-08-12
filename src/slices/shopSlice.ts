import { createSlice } from "@reduxjs/toolkit";

const allShopItems = [
    {
        name: 'health potion',
        money: 20
    },
    {
        name: 'mana potion',
        money: 20
    }
]

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shopItems: allShopItems
    },
    reducers: {
        
    }
})

export const {} = shopSlice.actions;
export default shopSlice.reducer;