import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {createComment} from "../firebase/firestoreActions"
// import { useCredentials } from '../hooks/useCredentials';
import {useUser} from "../context/context"

export default function AddCommentDialog({open, setOpen, postData}) {
    //   const [open, setOpen] = React.useState(false);
      const [body, setBody] = useState("")
      const {credentials} = useUser()
      const handleComment =async e => {
        try {
            createComment(body, credentials, postData)
        }
        catch {
            alert("something went wrong")
        }
        setOpen(false)
        setBody("")
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
                label="Comment on this post"
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleComment} color="primary">
                Comment
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }