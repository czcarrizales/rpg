import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
    name: 'battle',
    initialState: {
        playerTurn: true,
        inBattle: false,
        damagePlayerDid: 0,
        battleDialogue: [] as string[]
    },
    reducers: {
        setPlayerTurn: (state, action) => {
            state.playerTurn = action.payload
        },
        setInBattle: (state, action) => {
            state.inBattle = action.payload;
        },
        setDamagePlayerDid: (state, action) => {
            state.damagePlayerDid = action.payload
        },
        addToBattleDialogue: (state, action: PayloadAction<string>) => {
            state.battleDialogue.unshift(action.payload)
        },
        setBattleDialogueToEmpty: (state) => {
            state.battleDialogue = []
        }
    }
})

export const {setPlayerTurn, setInBattle, setDamagePlayerDid, addToBattleDialogue, setBattleDialogueToEmpty} = battleSlice.actions;
export default battleSlice.reducer