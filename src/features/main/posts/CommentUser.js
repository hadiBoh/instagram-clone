import { memo } from "react"
import { useSelector } from "react-redux"
import { selectUserById } from "./userApiSlice"


const CommentUser = ({userId}) => {

    const user = useSelector(state => selectUserById(state , userId))
    
    return (
        <>
            <div className='img-cont'>
                <img src={`http://localhost:3500/${user?.profile}`} alt='profile' />
            </div>
            <span>{user.username}</span>
        </>
    )
}

const CommentUserMeno = memo(CommentUser)
export default CommentUserMeno