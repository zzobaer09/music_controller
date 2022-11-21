import { Button, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Room extends Component{
    constructor(props){
        super(props)
        this.state = {
            votesToSkip : 2,
            guestCanPause: false,
            isHost: false
        }
        this.roomCode = this.props.match.params.roomCode
    
        this.getRoomDitail()
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
    }
    
    leaveButtonPressed(){
        const requestOption = {
            method: "POST",
            headers: {"Content-Type":"application/json"}
        }
        fetch("/api/leave-room/" , requestOption)
            .then(_response=>{
                // this.props.leaveRoomCallback()
                this.props.history.push("/")
            })
    }

    getRoomDitail(){
        fetch("/api/get-room" + "?code=" + this.roomCode)
            .then(response=>{
                if(!response.ok){
                    // this.props.leaveRoomCallback()
                    this.props.history.push("/")
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    votesToSkip : data.votes_to_skip,
                    guestCanPause : data.guest_can_pause,
                    isHost : data.isHost,
                })
                console.log(data);
            })
    }

    render(){
        
        return (
            <Grid container spacing={1}>
                
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Room Code : {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h4">
                        Votes : {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h4">
                        Guest Can Pause : {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h4">
                        Host : {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
            // <div>
            //     <h3>Room Code: {this.roomCode}</h3>
            //     <p>Votes: {this.state.votesToSkip}</p>
            //     <p>Guest can pause: {this.state.guestCanPause.toString()}</p>
            //     <p>Host: {this.state.isHost.toString()}</p>
            // </div>

            