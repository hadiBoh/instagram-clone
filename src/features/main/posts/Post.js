import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faBookmark, faComment } from '@fortawesome/free-regular-svg-icons'

import React, { memo } from 'react'
import LikeMemo from './Like'
import ShowLikesMemo from './ShowLikes'
import TheCommentMemo from './TheComment'
import Caption from './Caption'
import ImgPost from './ImgPost'
import HeaderPost from './HeaderPost'
import { selectPostById, useGetPostsByPageQuery} from './postApiSlice'
import { useSelector } from 'react-redux'



const Post = React.forwardRef(({postId} , ref) => {
    const { post } = useGetPostsByPageQuery('getPostsByPage', {
        selectFromResult: ({ data, isLoading }) => ({
            post: data?.entities[postId],
            isLoading
        }),
    })
    const userId = post?.userId

    return (
        ref ?
        <article className='post'>
            <HeaderPost userId={userId}/>
            <ImgPost postId={postId}/>
            <footer  ref={ref}>
                <div className='left-foot-icon'>
                    
                    <LikeMemo postId={postId}/>
                    <FontAwesomeIcon icon={faComment} />
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
                <div className='right-foot-icon'>
                    <FontAwesomeIcon icon={faBookmark} />
                </div>
            </footer>
            <ShowLikesMemo postId={postId} />
            <Caption userId={userId} postId={postId}/>
            <TheCommentMemo userId={userId} postId={postId} />
        </article>

        :

        <article className='post'>
        <HeaderPost userId={userId}/>
        <ImgPost postId={postId}/>
        <footer>
            <div className='left-foot-icon'>
                
                <LikeMemo postId={postId}/>
                <FontAwesomeIcon icon={faComment} />
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <div className='right-foot-icon'>
                <FontAwesomeIcon icon={faBookmark} />
            </div>
        </footer>
        <ShowLikesMemo postId={postId} />
        <Caption userId={userId} postId={postId}/>
        <TheCommentMemo userId={userId} postId={postId} />
    </article>
    )
})

export const MemoizedPost = memo(Post)
export default Post