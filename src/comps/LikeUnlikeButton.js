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
    const {likes, setLikes} = useLikes(postData);
    // const handleLike =async e => {
    //     // console.log(loading)
    //     if (loading) {
    //         return;
    //     }
    //     setLoading(true)
    //     try {
    //         if(likes.length === 0) {
    //             console.log(likes.length)
    //             await likePost(postData, username)   
    //             setLoading(false)
                
    //         }
    //         else if (likes.length === 1) {
    //             console.log(likes.length)
    //             await unLikePost(postData)
    //             setLoading(false)
    //             setLikes([])
    //         }
    //         else {
    //             setLoading(false)
    //             return
    //         }
    //     }
        // catch {
        //     console.log("something went wrong Like/Unlike")
        //     setLoading(false)
        // }
        
    
    let likeMarkup = likes.length === 0 ? (
        <Tooltip title="Like this post">
            <IconButton disabled={loading} onClick={async (e) => {
                if (likes.length > 0) {
                    return
                }
                setLoading(true)
                await likePost(postData, username)
                setLoading(false)
            }
        }>
                <FavoriteBorderIcon />
            </IconButton>
        </Tooltip>)
        : 
        (
        <Tooltip title="Unlike this post">
            <IconButton disabled={loading} onClick={async () => {
                if (likes.length !== 1) {
                    return
                }
                setLoading(true)
                await unLikePost(postData)
                setLoading(false)
                setLikes([])
            }}>
                 <FavoriteIcon />
            </IconButton>
        </Tooltip>
        )
    return (
        likeMarkup
    )
}
