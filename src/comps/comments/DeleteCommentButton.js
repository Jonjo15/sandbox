import IconButton from "@material-ui/core/IconButton"
// import {auth} from "../../firebase/config"
import {useState} from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteCommentDialog from "./DeleteCommentDialog"
import Tooltip from '@material-ui/core/Tooltip';
import {useUser} from "../../context/context"
const DeleteCommentButton = ({userId, commentId, postId}) => {
    const [open, setOpen] = useState(false)
    const {user} = useUser()
    const markup = user.uid === userId ? (
        <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => setOpen(!open)} className="delete-comment">
            <DeleteIcon />
            <DeleteCommentDialog postId={postId} open={open} setOpen={setOpen} commentId={commentId}/>
        </IconButton>
        </Tooltip>
        
  )
     :
      null

      return <>{markup}</>
}

export default DeleteCommentButton