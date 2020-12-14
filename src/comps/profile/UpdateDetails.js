import {updateUserDetails} from "../../firebase/firestoreActions"
import {useState} from "react"
import {useUser} from "../../context/context"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import DialogActions from "@material-ui/core/DialogActions"
const UpdateDetails = ({open, setOpen}) => {
    const {credentials, setCredentials} = useUser()
    const handleClick =async e => {
        if (bio.trim() === "" || website.trim() ==="") {
            setError("Must not be empty")
            return;
        }
        try {
            setError("")
            updateUserDetails(bio, website)
            setCredentials({...credentials, bio, website})
        }
        catch {
            console.error("something went wrong")
            setError("something went wrong")
        }
        setOpen(false)
    }
    const handleClose = e => {
        setOpen(false)
    }
    const [bio, setBio] = useState("")
    const [error, setError] = useState("")
    const [website, setWebsite] = useState("")
    return (
        <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent className="post-dialog">
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                autoFocus
                id="bio"
                label="Your bio"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                fullWidth
            />
            <TextField
                autoFocus
                id="bio"
                label="Your website"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClick} color="primary">
                Update
            </Button>
            </DialogActions>
        </Dialog>
  )
}

export default UpdateDetails