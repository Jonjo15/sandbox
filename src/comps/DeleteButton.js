import IconButton from "@material-ui/core/IconButton"
import {auth} from "../firebase/config"
import {useState} from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import DeletePostDialog from "./DeletePostDialog"
const DeleteButton = ({userId, postId}) => {
    const [open, setOpen] = useState(false)
    const markup = auth.currentUser.uid === userId ? (<IconButton onClick={() => setOpen(!open)} className="delete-post">
        <DeleteIcon />
        <DeletePostDialog open={open} setOpen={setOpen} postId={postId}/>
    </IconButton>)
     :
      null

      return <>{markup}</>
}

export default DeleteButton