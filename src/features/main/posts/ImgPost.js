import React from 'react'
import { useGetPostsByPageQuery } from './postApiSlice'


const ImgPost = ({postId}) => {
    const { post } = useGetPostsByPageQuery('getPostsByPage', {
        selectFromResult: ({ data, isLoading }) => ({
            post: data?.entities[postId],
            isLoading
        }),
    })

    return (
        <section className='post-img'>
            <img src={`http://localhost:3500/${post?.img}`} alt='post img' />
        </section>
    )
}

export default ImgPost