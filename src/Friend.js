import React, {Component} from "react";
import {Card, CardContent, CardMedia, CardActionArea } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";


export default class Friend extends Component {

  render() {
    const {model, onFriendClick} = this.props;
    return (
      <Card variant='outlined'>
        <CardActionArea onClick={()=> {
          if(onFriendClick) onFriendClick(model)
        }}>
          <CardMedia
            component="img"
            alt={model.name}
            height="80"
            image={`https://i.pravatar.cc/300?img=${this.props.model.id}`}
            title={model.name}
          />
          <CardActions>
            {model.name.split(' ')[0]}
          </CardActions>
        </CardActionArea>
      </Card>
    )
  }
}