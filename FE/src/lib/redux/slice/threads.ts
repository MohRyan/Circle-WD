// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IThreads } from "../type";





const initialState: IThreads[] = []


const ThreadsSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {
        ADDTHREADS: (state, action: PayloadAction<IThreads>) => {
            state.unshift(action.payload)
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

export const { ADDTHREADS } = ThreadsSlice.actions
export default ThreadsSlice.reducer