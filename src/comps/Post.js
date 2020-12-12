import React, {useState, Fragment} from "react"
import dayjs from "dayjs"
import Tooltip from "@material-ui/core/Tooltip"
import { makeStyles } from '@material-ui/core/styles';
import AddCommentDialog from "./AddCommentDialog";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import DeleteButton from "./DeleteButton"
import CommentIcon from '@material-ui/icons/Comment';
import Comments from "./Comments"
import LikeUnlikeButton from "./LikeUnlikeButton"
// import NoImg from "../images/no-img.png"
var relativeTime = require('dayjs/plugin/relativeTime')
const useStyles = makeStyles({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
      },
      image: {
        minWidth: 200
      },
      content: {
        padding: 25,
        objectFit: 'cover'
      },
      delete: {
        //   display: "none",
          position: "absolute",
          top: "10%",
          right: "85%"
      }
})
const Post = ({postData}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    dayjs.extend(relativeTime)
    const handleClick = e => {
        setOpen(true)
    }
    let commentString = postData.comments === 1 ? "comment" : "comments"
    let likesString = postData.likes === 1 ? "like" : "likes"
    return (
        <Fragment>
            <Card className={classes.card}>
                <CardMedia
                image={postData.imageUrl}
                title="Profile image"
                className={classes.image}
                />
                <CardContent className={classes.content}>
                <DeleteButton className={classes.delete} postData={postData}/>
                <Typography
                    variant="h5"
                    color="primary"
                >
                    {postData.username}
                </Typography>
                <Typography variant="body1">{postData.body}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(postData.createdAt).fromNow()}
                </Typography>
                <AddCommentDialog open={open} setOpen={setOpen} postData={postData}/>
                <LikeUnlikeButton postData={postData}/>
               <span>{postData.likes} {likesString}</span>
                <Tooltip title="Post a comment">
                    <IconButton onClick={handleClick}>
                        <CommentIcon />
                    </IconButton>
                </Tooltip> 
                <span>{postData.comments} {commentString}</span>
                </CardContent>
            </Card>
            {postData.comments > 0 ? <Comments postData={postData}/> : null}
        </Fragment>
        
    )
}

export default Post