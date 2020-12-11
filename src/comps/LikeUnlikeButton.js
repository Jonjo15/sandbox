import React from 'react'
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import {likePost, unLikePost} from "../firebase/firestoreActions"
import {useUser} from "../context/context"
export default function LikeUnlikeButton({postId}) {
    const {credentials: {username}} = useUser()
    const handleLike =async e => {
        try {
            await likePost(postId, username)
            setTimeout(() => unLikePost(postId), 2000)
        }
        catch {
            console.log("something went wrong Like/Unlike")
        }
        
    }
    return (
        <Tooltip title="Like this post">
            <IconButton onClick={handleLike}>
                 <ThumbUpIcon />
            </IconButton>
        </Tooltip>
    )
}
