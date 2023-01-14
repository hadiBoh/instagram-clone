import { useCallback, useRef, useState } from "react"
import useUseGetPostsByPageQuery from "../../../hooks/useUseGetPostsByPageQuery"
import { useGetCommentsQuery } from "./commentApiSlice"
import { useGetLikesQuery } from "./likeApiSlice"
import {MemoizedPost} from "./Post"


import { useGetUsersQuery } from "./userApiSlice"


const Posts = () => {

/*     const interval = {
        pollingInterval:15000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true} */

        const [page , setPage] = useState(1)

    const {data :posts, isSuccess  , isLoading , hasNext} = useUseGetPostsByPageQuery(page)




    
    const {isSuccess:isUserSuccess} = useGetUsersQuery()
    const {isSuccess:iscommentSuccess} = useGetCommentsQuery()
    const {isSuccess:isLikesSuccess} = useGetLikesQuery()
    let content

        const iniObserver = useRef()
        const lastPostRef = useCallback(post=>{
            if (isLoading) return
            if (iniObserver.current) iniObserver.current.disconnect()

            iniObserver.current = new IntersectionObserver(posts=>{
                if (posts[0].isIntersecting&& hasNext ) {
                    console.log("near Last");
                    setPage(prev=>prev+1)
                }
            })

            if(post) iniObserver.current.observe(post)
            
        },[isLoading , hasNext ])

    if (isSuccess && isUserSuccess && iscommentSuccess && isLikesSuccess) {
        const {ids } = posts

        content = (
            <div className='posts-container'>
                {ids?.map((postId , i)=> {
                    if (ids.length === i+1) {
                        return <MemoizedPost ref={lastPostRef} key={postId} postId={postId} />
                    }
                    return <MemoizedPost key={postId} postId={postId} />
                })}
            </div>
        )
    }



    return content
}

export default Posts