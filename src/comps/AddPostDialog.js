import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {createPost} from "../firebase/firestoreActions"
// import { useCredentials } from '../hooks/useCredentials';
import {useUser} from "../context/context"
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddPostDialog({open, setOpen}) {
//   const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("")
  const {credentials} = useUser()
  const handlePost =async e => {
    try {
        createPost(text, credentials)
    }
    catch {
        alert("something went wrong")
    }
    setOpen(false)
    setText("")
  }
  const handleClose = e => {
      setOpen(false)
  }
  return (
    <div>
      <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent className="post-dialog">
          <TextField
            autoFocus
            multiline
            rows="3"
            id="name"
            label="What's on your mind?"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}