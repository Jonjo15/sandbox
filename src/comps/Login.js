import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import TypoGraphy from "@material-ui/core/Typography"
import {validateLogin} from "../util/validators"
import { useUser } from '../context/context';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
export default function Login() {
    const classes = useStyles()
    const {login, loginError} = useUser()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    // const history = useHistory()
    const handleSubmit =async e => {
        e.preventDefault()
        const [valid, err] = validateLogin(email, password)
        if(!valid) {
            setError(err)
            return
        }
        else {
            try {
                await login(email, password)
            }
            catch {
                setError("Failed to Log In")
            }
        }
    }
    return (
        <div>
            <Grid container>
                <Grid item sm></Grid>
                <Grid item sm>
                <form onSubmit={handleSubmit} noValidate className={classes.root}>
                        {(error || loginError) && <TypoGraphy variant="body1" color="error">{error || loginError || ""}</TypoGraphy>}
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
                     <Button fullWidth type="submit" color="primary" variant="contained">Submit</Button>
                    </form>
                    <small className={classes.small}>Don't have an account? Sign up <Link to="/signup">here</Link></small>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        </div>
    )
}
