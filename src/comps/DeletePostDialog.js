import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import {createPost} from "../firebase/firestoreActions"
// import { useCredentials } from '../hooks/useCredentials';
import { DialogContentText } from '@material-ui/core';
import {deletePost} from "../firebase/firestoreActions"
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddPostDialog({open, setOpen, postId}) {
//   const [open, setOpen] = React.useState(false);
//   const [text, setText] = useState("")
//   const {credentials} = useCredentials()
  const handlePost = e => {
    try {
        deletePost(postId)
    }
    catch {
        console.log("error")
    }
  }
  const handleClose =async e => {
      setOpen(false)
  }
  return (
    <div>
      <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContentText>Are you sure you want to delete your post</DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}