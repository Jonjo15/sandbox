import {useUser} from "../context/context"
import {auth} from "../firebase/config"
import {useHistory} from "react-router-dom"
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useCredentials} from "../hooks/useCredentials" 
const useStyles = makeStyles({
    root: {
      minWidth: 275,
      minHeight: 200,
      position: "relative",
      marginRight: 20,
      marginLeft: 15
    },
    button: {
        position: "absolute",
        right: "40%",
        top: "75%"
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function Profile({setError}) {
    const classes = useStyles();
    const history = useHistory()
    const { logout} = useUser()
    const {credentials, error} = useCredentials(auth.currentUser)
    const handleClick = async e => {
        try {
            await logout()
            history.push("/login")
        }
        catch {
            setError("Failed to log out")
        }
    }
    return (
        <Card className={classes.root}>
      <CardContent>
          {error && <Typography color="error">{error}</Typography>}
        {credentials && <Typography className={classes.title} color="primary">
          {credentials.username}
        </Typography>}
        {credentials && <Typography className={classes.pos} color="primary">
          {credentials.email}
        </Typography>}
        {credentials && <Typography className={classes.pos} color="primary" variant="body1">{credentials.userId}</Typography>}
      </CardContent>
      <CardActions>
        <Button className={classes.button} onClick={handleClick} color="primary" variant="contained">Log Out</Button>
      </CardActions>
    </Card>
    )
}
