import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid"
import {auth} from "../firebase/config"
import {Redirect} from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import TypoGraphy from "@material-ui/core/Typography"
import {validateSignup} from "../util/validators"
import { useUser } from '../context/context';
import { Link} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: "0 auto",
        width: '25ch',
        textAlign: "center",
        marginTop: 20
      },
    },
    field: {
        display: "block",
    },
    small: {
        marginTop: 15
    }
  }));
export default function Signup() {
    const classes = useStyles();
    const {signup, signupError} = useUser()
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    // const history = useHistory()
    const handleSubmit =async e => {
        setError("")
        e.preventDefault()
        const [valid, err] = validateSignup(email, password, confirmPassword)
        if (!valid) {
            setError(err)
            return
        }
        else {
            try {
               await signup(email, password, userName)
            }
            catch {
                setError("Failed to create an account")
            }
        }
    }
    const markUp = auth.currentUser ? (<Redirect to="/" />) : (<div>
        <Grid container>
            <Grid item sm></Grid>
            <Grid item sm className="grid-cont">
                <form onSubmit={handleSubmit} noValidate className={classes.root}>
                    {(error || signupError) && <TypoGraphy variant="body1" color="error">{error || signupError || ""}</TypoGraphy>}
                <TextField
                    className={classes.field}
                    fullWidth
                    id="outlined-name"
                    label="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    variant="filled"
                />
                <TextField
                    className={classes.field}
                    fullWidth
                    id="outlined-name"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="filled"
                />
                <TextField
                    className={classes.field}
                    fullWidth
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="filled"
                    type="password"
                />
                <TextField
                    className={classes.field}
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="filled"
                />
                <Button fullWidth type="submit" color="primary" variant="contained">Submit</Button>
                <br/>
                <small className={classes.small}>Already have an account? Log in <Link to="/login">here</Link></small>
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    </div>)
    return (
        markUp
    )
}