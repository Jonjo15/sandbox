import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import {useUser} from "../../context/context"
import EmailIcon from '@material-ui/icons/Email';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia"
import NoImg from "../../images/no-img.png"

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      minHeight: 350,
      position: "relative",
      marginRight: 20,
      marginTop: 15,
      marginLeft: 15, 
      display: "block"
    },
    button: {
        margin: "0 auto",
        position: "absolute",
        left: "30%",
        top:"100%"

    },
    title: {
      fontSize: 20,
    },
    pos: {
      marginBottom: 12,
    },
    image: {
      // position: "absolute",
      // right: "20%",
      objectFit: "cover",
      width: 200,
      margin: "0 auto", 
      marginTop: 10,
      textAlign: "center"
    },
    action: {
      display: "block",
      position: "relative",
    },
    edit: {
      float: "right"
    }
  });

export default function StaticProfile({creds}) {
    let img = NoImg;
    const [imageUrl] = useState(img)
    // const { credentials} = useUser()

    const classes = useStyles();
    return (
        <Card className={classes.root}>
          {creds && (<CardMedia
          className={classes.image}
          component="img"
          alt="Profile picture"
          height="140"
          image={creds.imageUrl ? creds.imageUrl : imageUrl}
          title="Profile picture"
        />)}
          {creds && (<CardContent>
            <Typography variant="body1" className={classes.title} color="primary">
              {creds.username}
            </Typography>
            <div>
                <EmailIcon style={{marginRight: 5, marginTop:5}} />
                <Typography className={classes.pos} color="primary">
              {creds.email}
                </Typography>
            </div>
            {creds.bio && <Typography>Bio: {creds.bio}</Typography>}
            {creds.website && <Typography>Website: {creds.website}</Typography>}
          </CardContent>) } 
    </Card>
    )
}
