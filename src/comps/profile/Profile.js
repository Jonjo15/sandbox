import {useUser} from "../../context/context"
import Tooltip from "@material-ui/core/Tooltip"
import ProgressBar from "./ProgressBar"
import {useHistory} from "react-router-dom"
import EmailIcon from "@material-ui/icons/Email"
import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from "@material-ui/core/IconButton"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia"
import NoImg from "../../images/no-img.png"
import UpdateDetails from "./UpdateDetails"
import EditIcon from '@material-ui/icons/Edit';
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

export default function Profile({setError}) {
    let img = NoImg;
    const [imageUrl, setImageUrl] = useState(img)
    const classes = useStyles();
    const history = useHistory()
    const { logout, credentials} = useUser()
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState(null)

    const handleClick = async e => {
        try {
            await logout()
            history.push("/login")
        }
        catch {
            setError("Failed to log out")
        }
    }
    const handleChange = e => {
      const types = ["image/jpeg","image/png"]
      const file = e.target.files[0]
      if (!types.includes(file.type)) {
        alert("file must be an image type")
        setFile(null)
        return;
      }
      else {
        setFile(file)
      }
    }
    const handleImageChange = e => {
      const fileInput = document.getElementById('imageInput');
      fileInput.click();
    }
    return (
        <Card className={classes.root}>
          {credentials && (<CardMedia
          className={classes.image}
          component="img"
          alt="Profile picture"
          height="140"
          image={credentials.imageUrl ? credentials.imageUrl : imageUrl}
          title="Profile picture"
        />)}
          <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleChange}
            />
          <Tooltip title="Change Profile Image">
              <IconButton className={classes.edit} onClick={handleImageChange}>
                <EditIcon />
              </IconButton>
          </Tooltip>
          
          {file && <ProgressBar file={file} setFile={setFile} setImageUrl={setImageUrl}/>}
          {credentials && (<CardContent>
            <Typography variant="body1" className={classes.title} color="primary">
              {credentials.username}
            </Typography>
            <div>
                <EmailIcon style={{marginRight: 5, marginTop:5}} />
                <Typography className={classes.pos} color="primary">
              {credentials.email}
                </Typography>
            </div>
            {credentials.bio && <Typography>Bio: {credentials.bio}</Typography>}
            {credentials.website && <Typography>Website: {credentials.website}</Typography>}
          </CardContent>) } 
        <CardActions className={classes.action}> 
          <Tooltip title="Edit your profile details">
            <IconButton className={classes.edit} onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <UpdateDetails open={open} setOpen={setOpen}/>
          <Button className={classes.button} onClick={handleClick} color="primary" variant="contained">Log Out</Button>
      </CardActions>
    </Card>
    )
}
