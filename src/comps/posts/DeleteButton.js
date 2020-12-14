import IconButton from "@material-ui/core/IconButton"
import {auth} from "../../firebase/config"
import {useState} from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import DeletePostDialog from "./DeletePostDialog"
import Tooltip from '@material-ui/core/Tooltip';

const DeleteButton = ({userId, postData}) => {
    const [open, setOpen] = useState(false)
    const markup = auth.currentUser.uid === postData.userId ? (
    <Tooltip title="Delete">
        <IconButton className="delete-post" aria-label="delete" onClick={() => setOpen(!open)}>
            <DeleteIcon />
            <DeletePostDialog open={open} setOpen={setOpen} postData={postData}/>
        </IconButton>
    </Tooltip>)
     :
      null

      return <>{markup}</>
}

export default DeleteButton