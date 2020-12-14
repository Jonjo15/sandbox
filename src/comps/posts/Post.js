import React, {useState, Fragment} from "react"
import dayjs from "dayjs"
import {Link} from "react-router-dom"
import Tooltip from "@material-ui/core/Tooltip"
import { makeStyles } from '@material-ui/core/styles';
import AddCommentDialog from "../comments/AddCommentDialog";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import DeleteButton from "./DeleteButton"
import CommentIcon from '@material-ui/icons/Comment';
import Comments from "../comments/Comments"
import LikeUnlikeButton from "./LikeUnlikeButton"
var relativeTime = require('dayjs/plugin/relativeTime')
const useStyles = makeStyles({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 5,
        width: "100%",
        marginTop: 15
      },
      image: {
        minWidth: 200
      },
      content: {
        position: "relative",
        width: "100%",
        padding: 10,
        paddingBottom: 0,
        objectFit: 'cover'
      },
      left: {
          display:"flex",
          float: "left",
          marginLeft: 0
      }
    //   delete: {
    //     //   display: "none",
    //       position: "absolute",
    //       top: "10%",
    //       right: "85%"
    //   }
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
                <CardContent className={classes.content} style={{paddingBottom: 0, position: "relative"}}>
                <DeleteButton postData={postData}/>
                <br />
                <Typography className="post-time" component={Link}
                    to={`/users/${postData.userId}/${postData.postId}`}  
                    variant="body2" 
                    color="textSecondary">
                    {dayjs(postData.createdAt).fromNow()}
                </Typography>
                <br/>
                <Typography
                    className="post-author"
                    component={Link}
                    to={`/users/${postData.userId}`}          
                    variant="h5"
                    color="primary"
                >
                    {postData.username}
                </Typography>
                <br />
                <Typography className="post-body" variant="body1">{postData.body}</Typography>
                <br/>
                <AddCommentDialog open={open} setOpen={setOpen} postData={postData}/>
               <div className="post-buttons">
                    <LikeUnlikeButton postData={postData}/>
                        <span>{postData.likes} {likesString}</span>
                        <Tooltip title="Post a comment">
                            <IconButton onClick={handleClick}>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip> 
                    <span>{postData.comments} {commentString}</span>
                </div> 
                
                </CardContent>
            </Card>
            {postData.comments > 0 ? <Comments postData={postData}/> : null}
        </Fragment>
        
    )
}

export default Post