import React, {useState} from 'react'
import {useUser} from "../context/context"
// import {auth} from "../firebase/config"
// import AddPostDialog from "./AddPostDialog"
// import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Profile from './Profile'
export default function Home() {
    const {user} = useUser();
    // const history = useHistory()
    const [error, setError] = useState("")
    
    return (
        <div>
            <h1>{JSON.stringify(user.uid)}</h1>
            {/* <h1>{JSON.stringify(auth.currentUser.uid)}</h1> */}
            <Grid container>
                <Grid  item sm={8}>home...</Grid>
                <Grid item sm={4}><Profile setError={setError}/></Grid>
            </Grid>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            {/* <Button onClick={handleClick} color="primary" variant="contained">Log out</Button> */}
        </div>
    )
}
