import { Outlet } from "react-router-dom"
import { store } from "../features/store"
import { postApiSlice } from "../features/main/posts/postApiSlice"
import { userApiSlice } from "../features/main/posts/userApiSlice"
import { likeApiSlice } from "../features/main/posts/likeApiSlice"
import { commentApiSlice } from "../features/main/posts/commentApiSlice"
import { useEffect } from "react"

const Prefetch = () => {
    useEffect(() => {
        console.log("subscribing...");

        const users = store.dispatch(userApiSlice.endpoints.getUsers.initiate())
        
        const likes = store.dispatch(likeApiSlice.endpoints.getLikes.initiate())
        const comments = store.dispatch(commentApiSlice.endpoints.getComments.initiate())


        return () => {
            console.log("unSubscribing...");
            users.unsubscribe()
            
            likes.unsubscribe()
            comments.unsubscribe()
        }
    }, [])
    return <Outlet />
}

export default Prefetch