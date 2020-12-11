import {useUser} from "../context/context"
import Tooltip from "@material-ui/core/Tooltip"
import ProgressBar from "./ProgressBar"
import {useHistory} from "react-router-dom"
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from "@material-ui/core/IconButton"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import {useCredentials} from "../hooks/useCredentials" 
import CardMedia from "@material-ui/core/CardMedia"
import NoImg from "../images/no-img.png"
import UpdateDetails from "./UpdateDetails"
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles({
    root: {
      minWidth: 275,
      minHeight: 350,
      position: "relative",
      marginRight: 20,
      marginLeft: 15, 
      display: "block"
    },
    button: {
        margin: "0 auto"
    },
    title: {
      fontSize: 14,
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
    edit: {
      float: "right"
    }
  });

export default function Profile({setError}) {
    let img = NoImg;
    const [imageUrl, setImageUrl] = useState(img)
    const classes = useStyles();
    const history = useHistory()
    // const [error, setError] = useState("")
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
    useEffect(() => {
      console.log(credentials)
    },[credentials])
    return (
        <Card className={classes.root}>
          {credentials && (<CardMedia
          className={classes.image}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={credentials.imageUrl ? credentials.imageUrl : imageUrl}
          title="Contemplative Reptile"
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
              {/* {error && <Typography color="error">{error}</Typography>} */}
            {credentials && <Typography className={classes.title} color="primary">
              Username: {credentials.username}
            </Typography>}
            {credentials && <Typography className={classes.pos} color="primary">
              Email: {credentials.email}
            </Typography>}
            {credentials.bio && <Typography>Bio: {credentials.bio}</Typography>}
            {credentials.website && <Typography>Website: {credentials.website}</Typography>}
          </CardContent>) } 
      <CardActions> 

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
