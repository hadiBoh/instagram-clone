
import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";

export const postCountAdapter = createEntityAdapter({})
const initialState = postCountAdapter.getInitialState()



export const postCountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCount: builder.query({
            query :()=> "/posts",
/*             transformResponse:(responseData)=>{
                return postCountAdapter.setAll(initialState , responseData)
            },
            */
        }),

    })
})


export const {  useGetAllCountQuery} = postCountApiSlice
