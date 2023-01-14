import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authSlice from "./auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
        reducer:{
            auth:authSlice,
            [apiSlice.reducerPath]:apiSlice.reducer,
        },
        middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)
        ,
        devTools:true
})

setupListeners(store.dispatch)