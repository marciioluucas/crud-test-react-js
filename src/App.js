import React, {Component} from 'react';
import {Grid, Card, CardContent} from "@material-ui/core";
import axios from "./axios";
import UserList from "./UserList";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import UserService from "./UserService";
import Paper from "@material-ui/core/Paper";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasMessage: false,
      messageType: 'success',
      user: {
        username: "",
        password: "",
        email: "",
        profile: {
          gamerTag: "",
          nickname: ""
        },
      },
      items: []
    }
  }

  componentDidMount() {
    UserService.find().then((items) => {
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


  async deleteUser(user) {
    try {
      await UserService.delete(user.id);

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

  async save() {
    try {
      const isEditing = this.state.user.id;
      const user = await UserService.save(this.state.user);
      if (isEditing) {
        const items = this.state.items;
        items.splice(items.indexOf(this.state.user), 1, user)
        this.setState(
          {items}
        )
      } else {
        this.setState({
          items: [...this.state.items, user],
        });
      }
      this.setState({

        hasMessage: true,
        messageType: 'success',
        message: `Usuário ${isEditing ? 'salvo' : 'criado'} com sucesso!`
      });

      this.clear();
    } catch (e) {
      this.setState({
        hasMessage: true,
        messageType: 'error',
        message: e.message
      });
    }
  }

  fillUser(payload) {
    this.setState({user: payload})
  }

  clear() {
    this.setState({
      user: {
        username: "",
        password: "",
        email: "",
        profile: {
          gamerTag: "",
          nickname: ""
        },
      }
    })
  }

  handleUsernameChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        username: event.target.value,
      },
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        password: event.target.value,
      },
    });
  }

  handleEmailChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        email: event.target.value,
      },
    });
  }

  handleNickNameChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        profile: {
          ...this.state.user.profile,
          nickname: event.target.value,
        }
      },
    });
  }

  handleGamerTagChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        profile: {
          ...this.state.user.profile,
          gamerTag: event.target.value,
        }
      },
    });
  }

  isValid() {
    const {username, password, email, profile} = this.state.user;

    return username !== '' && password !== '' && email !== '' && profile.nickname !== '' && profile.gamerTag !== ''
  }


  render() {
    const classes = styles();
    return (
      <div>
        <div style={classes.background}/>
        <Grid container style={classes.root}>
          <Grid item xs={5}>
            <Card style={classes.card}>
              <Grid container>
                <Grid item xs={12}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Crud
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                      Crud de usuário para teste da Spring Framework com ReactJS
                    </Typography>
                    <Grid container>
                      <Grid item xs={4}>
                        <TextField
                          label="Nome de usuário"
                          placeholder="nome de usuário"
                          ref={this.handleInputRef}
                          value={this.state.user.username}
                          onChange={this.handleUsernameChange}
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Senha"
                          value={this.state.user.password}
                          onChange={this.handlePasswordChange}
                          placeholder="sua senha"
                          disabled={this.state.user.id}
                          margin="normal"
                          type="password"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="E-mail"
                          value={this.state.user.email}
                          onChange={this.handleEmailChange}
                          placeholder="e-mail"
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Nickname"
                          value={this.state.user.profile.nickname}
                          onChange={this.handleNickNameChange}
                          placeholder="seu nickname"
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="GamerTag"
                          value={this.state.user.profile.gamerTag}
                          onChange={this.handleGamerTagChange}
                          placeholder="sua gamerTag"
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justify={"flex-end"}>
                          <Button style={{marginRight: 10}} onClick={() => this.clear()}>Limpar</Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.save()}
                            disabled={!this.isValid()}
                            style={classes.button}>
                            Enviar
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider style={{marginTop: 15}}/>
                    <div style={{maxHeight: "60vh", overflow: 'auto'}}>
                      <UserList items={this.state.items} onItemClick={(user) => this.fillUser(user)}
                                onItemDelete={(user) => this.deleteUser(user)}/>
                    </div>
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
}


const styles = () => ({
  root: {
    padding: "50px 100px",
    zIndex: 999,
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    display: "flex",
    height: "calc(100vh - 100px)"
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
