import React,{ Component } from "react";
import {TextField , Button , Grid , Typography} from "@material-ui/core"
import { Link } from "react-router-dom"
export default class RoomJoinPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            error : "",
            roomCode : ""
        }
        this._handleTextFieldChange = this._handleTextFieldChange.bind(this)
        this._roomButtonPressed = this._roomButtonPressed.bind(this)

    }
    render(){
        return (
            <Grid container spacing={1} alignItems="center">
                
                <Grid item xs={12} align="center">
                    <Typography variant="h4">
                        Join a Room
                    </Typography>
                </Grid>
                
                <Grid item xs={12} align="center">
                    <TextField 
                        error={this.state.error}
                        label="Code"
                        placeholder="enter room code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this._handleTextFieldChange}
                    />
                </Grid>

                {/* buttons */}
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this._roomButtonPressed}>
                        Join Room
                    </Button>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={ Link }>
                        Back
                    </Button>
                </Grid>
                {/* button end */}
                
            </Grid>
            
        )
    }

    _handleTextFieldChange(e){
        this.setState({
            roomCode: e.target.value
        })
    }
    _roomButtonPressed(){
        const requestOptions = {
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({
                code: this.state.roomCode
            })
        }

        fetch("/api/join-room/" , requestOptions).then(response=>{
            if(response.ok){
                this.props.history.push(`/room/${this.state.roomCode}`)
            }else{
                this.setState({
                    error:"Room not found"
                })
            }
        })
    }
}