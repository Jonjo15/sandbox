import React, {useState} from 'react'
import {Link} from "react-router-dom"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import NotificationsIcon from "@material-ui/icons/Notifications"
import useNotifications from "../hooks/useNotifications"
import Badge from '@material-ui/core/Badge';
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import MessageIcon from '@material-ui/icons/Message';
import Menu from "@material-ui/core/Menu"
import dayjs from "dayjs"
import FavoriteIcon from '@material-ui/icons/Favorite';
import {markNotificationsSeen} from "../firebase/firestoreActions"
var relativeTime = require('dayjs/plugin/relativeTime')

export default function Notifications() {
    // const [open, setOpen] = useState(false)
    dayjs.extend(relativeTime)

    const [anchorEl, setAnchorEl] = useState(null)
    const {notifications} = useNotifications()
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
      };
    const onMenuOpened = async () => {
        if (notifications.filter(not => not.seen === false ).length > 0 ) {
            try {
                let notsToMarkSeen= notifications.filter(not => not.seen === false).map(not => not.notificationId)
                console.log(notsToMarkSeen)
                await markNotificationsSeen(notsToMarkSeen)
            }
            catch {
                console.log("something went wrong /notifications")
            }
        }
    }
    const menuItems = notifications.length > 0 ? 
    (notifications.map((not, i) => {
        const iconColor = 'secondary';
        const notIcon = not.type ==="comment" ? (<MessageIcon color={iconColor} style={{marginRight: 5}}/>)
         : 
         (<FavoriteIcon color={iconColor} style={{marginRight: 5}}/>)
        const verb = not.type === "comment" ? "commented on your post" : "liked your post"
        if (i< 10) {
            return (
            <MenuItem onClick={handleClose} key={not.notificationId}>
            {notIcon}
            <Typography
             component={Link}
             to={`/users/${not.recipient}/post/${not.postId}`}
             >
                {not.sender} {verb} <small className="notification-time">{dayjs(not.createdAt).fromNow()}</small>
            </Typography>
            </MenuItem>)
        }
        else {
            return null
        }
        
    })) 
    :
     ( <MenuItem >You have no notifications yet</MenuItem>) 
     
    const iconMarkup = (notifications && notifications.length >0) ? (<Badge anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }} color="secondary" badgeContent={notifications.filter(not => not.seen === false ).length}>
          <NotificationsIcon />
          </Badge>) :
          ( <NotificationsIcon />)
    return (

        <>
            <Tooltip title="View Notificiations">
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{iconMarkup}</IconButton>
            </Tooltip>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onEntered={onMenuOpened}
                >
                    {menuItems}
            </Menu>
         </>      
    )
}
