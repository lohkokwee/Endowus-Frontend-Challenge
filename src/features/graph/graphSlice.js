import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    error: false,
}

export const graphSlice = createSlice({
    name: 'graphSlice',
    initialState,
    reducers: {
        updateGraphData: (state, action) => {
            // Updates the data state with payload to render the graph
            state.data = action.payload
        },
        updateLoad: (state, action) => {
            // Update status for loading spinner
            state.isLoading = action.payload
        },
        updateError: (state, action) => {
            // Update on the status of the error to prevent (old) graphs from rendering on errors.
            state.error = action.payload 
        }
    }
})

export const { updateGraphData, updateLoad, updateError } = graphSlice.actions
export default graphSlice.reducer