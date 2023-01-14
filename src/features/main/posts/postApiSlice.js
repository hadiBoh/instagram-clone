import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";

export const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
    selectId: (post) => post.postId
})
const initialState = postAdapter.getInitialState({
    posts: []
})


export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        addPost: builder.mutation({
            query: data => ({
                url: "/posts",
                method: "POST",
                body: data
            }),
            async onQueryStarted({ id, ...params }, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled
/*                         const {data} = await queryFulfilled
                        dispatch(postApiSlice.util.updateQueryData("getPostsByPage", params, (draft) => {
                            postAdapter.updateOne(draft, data.insertId)
                        })) */
                    } catch (error) {
                        console.log("file format is not supported");
                    }
            },
            invalidatesTags: [{ type: 'Post', id: 'List' }]
        }),
        getPostsByPage: builder.query({
            query: (pageNumber) => `posts/page?page=${pageNumber}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            transformResponse: (responseData) => {
                const posts = responseData.filtered.map(post => {
                    post.id = post.postId
                    return post
                })
                return postAdapter.setMany(initialState, posts)
            },
            merge: (current, newPosts) => {
                postAdapter.upsertMany(current, itemsSelector.selectAll(newPosts))
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                if (currentArg === 'getPostsByPage') {
                    return currentArg === previousArg
                }
                return currentArg !== previousArg
            },
            providesTags: [{ type: 'Post', id: 'List' }]
        }),
    })
})


export const { useAddPostMutation, useGetPostsByPageQuery } = postApiSlice

export const itemsSelector = postAdapter.getSelectors(stste => stste)
/* export const selectPostResult = postApiSlice.endpoints.getPostsByPage.select()

const selectPostData = createSelector(
    selectPostResult,
    postResult => postResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => selectPostData(state) ?? initialState) */

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = itemsSelector