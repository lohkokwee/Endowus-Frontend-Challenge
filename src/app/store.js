import { configureStore } from '@reduxjs/toolkit'
import graphSliceReducer from '../features/graph/graphSlice'

export const store = configureStore({
    reducer: {
        graphSlice: graphSliceReducer
    },
})