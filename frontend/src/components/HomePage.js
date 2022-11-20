import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {Grid , ButtonGroup , Button , Typography} from "@material-ui/core"

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IMPORT END !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "roomCode": null
    }
  }

  async componentDidMount(){
    fetch("/api/user-in-room/")
      .then(response=>response.json())
      .then(data=>{
        this.setState({
          "roomCode": data.code
        })
      })
  }

  renderHomePage(){
    return (
      <Grid>

        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            Home Party
          </Typography>
        </Grid>
        
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation color="secondary" variant="contained">
            <Button color="secondary" to="/create/" component={Link}>
              Create a room
            </Button>
            <Button color="primary" to="/join/" component={Link}>
              Join a room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={()=>{
            if (this.state.roomCode !== null){
              return <Redirect to={`/room/${this.state.roomCode}`}/>
            }else{
              return this.renderHomePage()
            }
          }}/>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path="/room/:roomCode" component={Room} />
        </Switch>
      </Router>
    );
  }
}