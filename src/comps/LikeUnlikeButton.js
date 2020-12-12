import React, {useState} from 'react'
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import {likePost, unLikePost} from "../firebase/firestoreActions"
import {useUser} from "../context/context"
import useLikes from "../hooks/useLikes"
export default function LikeUnlikeButton({postData}) {
    const {credentials: {username}} = useUser()
    const [loading, setLoading] = useState(false)
    const {likes} = useLikes(postData);
    const [length, setLength] = useState(likes.length)
    const handleLike =async e => {
        // console.log(loading)
        if (loading) {
            return;
        }
        setLoading(true)
        try {
            if(length === 0) {
                console.log(likes.length)
                await likePost(postData, username, length)   
                setLength(1)      
                setLoading(false)          
            }
            else if (length === 1) {
                console.log(likes.length)
                await unLikePost(postData, length)
                setLoading(false)
                setLength(0)
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
