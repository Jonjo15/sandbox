import {Link } from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from "@material-ui/core/Tooltip"
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton"
import AddPostDialog from "./AddPostDialog"
import React, {useState} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from "@material-ui/icons/Add"
// import NotificationsIcon from '@material-ui/icons/Notifications';
import Notifications from "./Notifications"
import { useUser } from "../context/context";

export default function Navbar() {
    const {user} = useUser()
    const [open, setOpen] = useState(false)
    const handleClick = e => {
        setOpen(!open)
    }
    const buttons = user ? (<>
    <AddPostDialog open={open} setOpen={setOpen}/>
    <Tooltip title="Home">
        <IconButton component={Link} to="/"><HomeIcon></HomeIcon></IconButton>
    </Tooltip>
    <Tooltip title="Add a new post">
        <IconButton onClick={handleClick}><AddIcon></AddIcon></IconButton>
    </Tooltip>
    <Notifications />
    </>)
     : 
     (<><Button component={Link} to="/login" color="inherit">Log In</Button>
                        <Button component={Link} to="/signup" color="inherit">Sign Up</Button></>)
    return (
        <div>
            <AppBar position="static">
                <Toolbar className="nav-container">
                        {buttons}
                </Toolbar>
            </AppBar>
        </div>
    )
}
