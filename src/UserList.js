import React, {Component} from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

class UserList extends Component {

    mapUsers() {
     return this.props.items.map((user,i) => (
        <ListItem button alignItems="flex-start" onClick={()=>this.props.onItemClick(user)} key={i}>
          <ListItemAvatar>
            <Avatar alt={user.profile?.nickname} />
          </ListItemAvatar>
          <ListItemText
            primary={user.profile?.nickname}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {user.email}
                </Typography>
                {" — " + user.profile?.gamerTag}
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction onClick={()=> this.props.onItemDelete(user)}>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ));
    }

    render() {
        return (
            <List>
              {this.mapUsers()}
            </List>
        )
    }
}

export default UserList