import React, {Component} from 'react';
import {Grid, Card, CardContent} from "@material-ui/core";
import Posts from "./Posts";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import PostService from "./PostService";
import Avatar from "@material-ui/core/Avatar";
import ProfileService from "./ProfileService";
import Friend from "./Friend";
import CardActionArea from "@material-ui/core/CardActionArea";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      items: [],
      selectedFriend: null,
    }
  }

  getAllPosts() {
    PostService.all().then((items) => {
      this.setState({
        items
      })
    }).catch((e) => {
      this.setState({
        hasMessage: true,
        messageType: 'error',
        message: e.message
      });
    });
  }

  componentDidMount() {
    this.getAllPosts()

    ProfileService.findFriends().then((friends) => {
      this.setState({
        friends
      })
    }).catch((e) => {
      this.setState({
        hasMessage: true,
        messageType: 'error',
        message: e.message
      });
    });
  }


  async deleteUser(user) {
    try {
      await PostService.delete(user.id);

      let users = this.state.items;

      users = users.filter(item => item !== user);

      this.setState({items: users});

      if (user.id === this.state.user.id) {
        this.clear();
      }
      this.setState({
        hasMessage: true,
        messageType: 'success',
        message: `Usuário excluído com sucesso!`
      });
    } catch (e) {
      this.setState({
        hasMessage: true,
        messageType: 'error',
        message: e.message
      });
    }
  }


  render() {
    const classes = styles();
    return (
      <div className={classes.app}>

        <div style={classes.background}/>
        <Grid container style={classes.root} spacing={4}>
          <Grid item xs={2} style={{height: "auto"}}>
            <Card style={{width: '100%'}}>
              <CardContent>
                <CardActionArea onClick={() => {
                  this.getAllPosts();
                  this.setState({
                    selectedFriend: null,
                  })
                }}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Avatar alt="Márcio Lucas" src="https://api.adorable.io/avatars/285/abott@adorable.png"/>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h6" component="h5">
                        Márcio Lucas
                      </Typography>
                    </Grid>
                  </Grid>
                </CardActionArea>
                <Divider style={{marginTop: 15}}/>
                <Typography gutterBottom variant="body2" component="span">Amigos</Typography>
                <Grid container spacing={1} style={{marginTop: '5px'}}>
                  {this.state.friends.map((friend, index) => {
                    return (
                      <Grid item xs={6}>
                        <Friend key={index} model={friend} onFriendClick={(friend) => this.handleFriendClick(friend)}/>
                      </Grid>
                    )
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card style={classes.card}>
              <Grid container>
                <Grid item xs={12}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Fakebook
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                      {this.state.selectedFriend && `Mostrando os posts de ${this.state.selectedFriend.name}`}
                    </Typography>
                    <Divider style={{marginTop: 15}}/>
                    <Posts items={this.state.items}/>
                  </CardContent>
                </Grid>

              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Snackbar open={this.state.hasMessage} autoHideDuration={6000} onClose={() => this.handleClose()}>
          <Alert onClose={() => this.handleClose()} severity={this.state.messageType}>
            {this.state.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }

  handleClose() {
    this.setState({
      hasMessage: false,
    })
  }

  async handleFriendClick(friend) {
    const posts = await PostService.findFriendPosts(friend.id);
    this.setState({
      items: posts,
      selectedFriend: friend,
    })
  }
}


const styles = () => ({
  root: {
    padding: "50px 100px",
    zIndex: 999,
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'start'
  },
  card: {
    display: "flex",
    marginBottom: "25px"
  },
  app: {
    background: "#cdc9e2"
  },
  background: {
    position: "absolute",
    height: 200,
    width: "100%",
    top: 0,
    background: "#7159C1"
  },

});

export default App;
