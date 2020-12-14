import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogContentText } from '@material-ui/core';
import {deleteComment} from "../../firebase/firestoreActions"


export default function DeleteCommentDialog({open, setOpen, commentId, postId}) {
  const handleDelete = e => {
    try {
        deleteComment(commentId, postId)
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
        <DialogContentText>Are you sure you want to delete your comment</DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}