import React, {useState, useEffect} from 'react'
import {firestore} from "../../firebase/config"
import useUsersPosts from "../../hooks/useUsersPosts"
import Grid from "@material-ui/core/Grid"
import Post from "../posts/Post"
import StaticProfile from "../profile/StaticProfile"
export default function User(props) {
    const [noUser, setNoUser] = useState(false)
    const [creds, setCreds] = useState(null)
    const [loading, setLoading] = useState(true)
    const {posts} = useUsersPosts(props.match.params.userId)
    useEffect(() => {
        firestore.collection("users").doc(props.match.params.userId).get()
        .then(async(snap) => {
            if (snap.exists) {
                console.log(snap.data())
                setCreds(snap.data())
                setLoading(false)
            }
            else {
                setLoading(false)
                setNoUser(true)
            }
        })
        .catch(err => console.log(err.message))

        return
    }, [props.match.params.userId])
    const postMarkup = posts ?
     (<Grid  item sm={8}>{posts.map(post => (<Post postData={post} key={post.postId}/>))}</Grid>) 
     : 
     (<Grid item sm={8}><h2>This user has no posts yet</h2></Grid>)
     
    const markUp = loading ? (<p>loading....</p>) : (noUser ? (<h1>User not found</h1>) : (<div>
            <Grid container>
                {postMarkup}
                <Grid item sm={4}>
                    {creds && <StaticProfile creds={creds}/>}
                    </Grid>
            </Grid>
        </div>))
    // const [error, setError] = useState("")
    return (
        markUp
    )
}
