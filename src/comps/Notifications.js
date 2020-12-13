import React, {useState} from 'react'
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import NotificationsIcon from "@material-ui/icons/Notifications"
import useNotifications from "../hooks/useNotifications"
import Badge from '@material-ui/core/Badge';
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"

export default function Notifications() {
    // const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const {notifications} = useNotifications()
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
      };
    const menuItems = notifications.length > 0 ? 
    (notifications.map(not => <MenuItem key={not.notificationId}>{not.sender} {not.type} on your post</MenuItem>)) 
    :
     ( <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>) 
     
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
                >
                    {menuItems}
            </Menu>
         </>      
    )
}
