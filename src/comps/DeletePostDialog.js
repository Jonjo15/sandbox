import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogContentText } from '@material-ui/core';
import {deletePost} from "../firebase/firestoreActions"


export default function DeletePostDialog({open, setOpen, postData}) {
  const handlePost = e => {
    try {
        deletePost(postData)
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