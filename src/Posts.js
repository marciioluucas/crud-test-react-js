import React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import moment from 'moment';
import red from "@material-ui/core/colors/red";

class Posts extends Component {

  mapPosts() {
    const fakeDate = moment().format('LL')
    return this.props.items.map((post, i) => (
      <Card style={{marginBottom: "10px"}} variant='outlined' key={i}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              {post.profile.name[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon/>
            </IconButton>
          }
          title={post.profile.name}
          subheader={fakeDate}
        />
        <CardContent>
          <Typography variant="title" color="textSecondary" component="h2">{post.title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color={'action'} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon/>
          </IconButton>
        </CardActions>
      </Card>
    ));
  }

  render() {
    return (
      <List>
        {this.mapPosts()}
      </List>
    )
  }
}

export default Posts