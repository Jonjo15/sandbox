import {Link } from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import {auth} from "../firebase/config"
// import Typography from '@material-ui/core/Typography';
// import IconButton from "@material-ui/core/IconButton"
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton"
import AddPostDialog from "./AddPostDialog"
import React, {useState} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from "@material-ui/icons/Add"
import { useUser } from "../context/context";

export default function Navbar() {
    const {user} = useUser()
    const [open, setOpen] = useState(false)
    const handleClick = e => {
        setOpen(!open)
    }
    const buttons = user ? (<>
    <AddPostDialog open={open} setOpen={setOpen}/>
    <IconButton component={Link} to="/"><HomeIcon></HomeIcon></IconButton>
    <IconButton onClick={handleClick}><AddIcon></AddIcon></IconButton>
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
