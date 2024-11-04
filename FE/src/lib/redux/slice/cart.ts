// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICart {
    id: number
}

const initialState: Array<ICart> = []


const cartSlice = createSlice({
    name: "sliceName",
    initialState,
    reducers: {
        AddCart: (state, action: PayloadAction<ICart>) => {
            if (state.find((item) => item.id === action.payload.id)) {
                state
            } else {
                state.push({ id: action.payload.id })
            }
        },

    },
    // extraReducers: builder => builder
    //     .addCase(actionName.pending, (state, { payload }) => {
    //         state.loading = true
    //     })
    //     .addCase(actionName.fulfilled, (state, { payload }) => {
    //         state.loading = false
    //     })
    //     .addCase(actionName.rejected, (state, { payload }) => {
    //         state.loading = false
    //         state.error = payload
    //     })

})

export const { AddCart } = cartSlice.actions
export default cartSlice.reducer