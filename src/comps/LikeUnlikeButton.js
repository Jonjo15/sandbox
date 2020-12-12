import React, {useState} from 'react'
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import {likePost, unLikePost} from "../firebase/firestoreActions"
import {useUser} from "../context/context"
import useLikes from "../hooks/useLikes"
export default function LikeUnlikeButton({postId}) {
    const {credentials: {username}} = useUser()
    const [loading, setLoading] = useState(false)
    const {likes, setLikes} = useLikes(postId);
    const handleLike =async e => {
        if (loading) {
            return;
        }
        setLoading(true)
        try {
            if(likes.length === 0) {
                await likePost(postId, username)
                setLoading(false)
            }
            else if(likes.length === 1) {
                await unLikePost(postId)
                setLoading(false)
                setLikes([])
            }
            else {
                setLoading(false)
                return
                
            }
        }
        catch {
            console.log("something went wrong Like/Unlike")
            setLoading(false)
        }
        
    }
    let likeMarkup = likes.length === 0 ? (
        <Tooltip title="Like this post">
            <IconButton onClick={handleLike}>
                <FavoriteBorderIcon />
            </IconButton>
        </Tooltip>)
        : 
        (
        <Tooltip title="Unlike this post">
            <IconButton onClick={handleLike}>
                 <FavoriteIcon />
            </IconButton>
        </Tooltip>
        )
    return (
        likeMarkup
    )
}
