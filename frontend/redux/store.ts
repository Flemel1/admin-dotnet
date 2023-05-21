import { configureStore } from "@reduxjs/toolkit";
import productReducer  from "./productSlice";
import serviceReducer  from "./service-slice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        service: serviceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch