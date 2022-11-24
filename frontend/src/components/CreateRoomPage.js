import React ,{ Component } from "react";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"; 
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom"
import  Radio  from "@material-ui/core/Radio";
import  RadioGroup  from "@material-ui/core/RadioGroup";
import  FormControlLabel  from "@material-ui/core/FormControlLabel";
import {Collapse} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
export default class CreateRoomPage extends Component{
    defaultVotes = 2;
    static defaultProps = {
        votesToSkip: 1,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: ()=>{},
        // closeSettingCallback: ()=>{},
    }
    constructor(props){
        super(props);

        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            successMsg: "",
            errorMsg: "",
        }
        
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }

    // *******************************************************************************************************
        // !to handler
    handleVotesChange(e){
        this.setState({
            votesToSkip : e.target.value,
        });
    }

    handleGuestCanPauseChange(e){
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false,
        });
    }

    // *********************************************************************************************************

    // ! to create button
    handleRoomButtonPressed(){
        const requestOptions = {
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify({
                votes_to_skip : this.state.votesToSkip,
                guest_can_pause : this.state.guestCanPause,
            })
        }
        const url = "/api/create-room/"
        fetch(url , requestOptions)
            .then(response => response.json())
            .then(data => this.props.history.push("/room/" + data.code))
    }
    // ! to update button
    handleUpdateButtonPressed(){
        const requestOptions = {
            method : 'PATCH',
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify({
                votes_to_skip : this.state.votesToSkip,
                guest_can_pause : this.state.guestCanPause,
                code: this.props.roomCode,
            })
        }
        const url = "/api/update-room/"
        fetch(url , requestOptions)
            .then(response=>{
                if(response.ok){
                    this.setState({
                        successMsg: "Room Updated Successfully"
                    })
                }else{
                    this.setState({
                        errorMsg: "An error occurred!"
                    })
                }
                this.props.updateCallback()
                // this.props.closeSettingCallback()
            })
    }

    renderCreateButton(){
        return (
            <Grid container spacing={1}>
                <Grid item align="center" xs={12}>
                    <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>
                        Create a room
                    </Button>
                </Grid>

                <Grid item align="center" xs={12}>
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderUpdateButton(){
        return (
            <Grid container spacint={1}>
                <Grid item align="center" xs={12}>
                    <Button color="primary" variant="contained" onClick={this.handleUpdateButtonPressed}>
                        Update Room
                    </Button>
                </Grid>

            </Grid>
        )
    }


    // ! main
    render(){
        
        const title = this.props.update ? "Update Room" : "Create Room"

        return (
            <Grid container spacing={1}>

                
                <Grid item align="center" xs={12}>
                    <Collapse in={this.state.errorMsg !=="" || this.state.successMsg !==""}>
                        {
                            this.state.successMsg!==""?
                            (
                                <Alert severity="success" onClose={()=>{this.setState({successMsg:""})}}>{this.state.successMsg}</Alert>
                            )
                            : 
                            (
                                <Alert severity="error" onClose={()=>{this.setState({errorMsg:""})}}>{this.state.errorMsg}</Alert>
                            )
                        }
                    </Collapse>
                </Grid>

                <Grid item align="center" xs={12}>
                    <Typography component="h4" variant="h4">
                        {title}
                    </Typography>
                </Grid>
                
                <Grid item align="center" xs={12}>
                    <FormControl component="fieldset">

                        <FormHelperText>
                            <div align="center">
                                <p>
                                    Guest Control of playback satate
                                </p>
                            </div>
                        </FormHelperText>

                        <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
                            <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom"/>
                            <FormControlLabel value="false" control={<Radio color="secondary"/>} label="no Control" labelPlacement="bottom"/>
                        </RadioGroup>

                    </FormControl>
                </Grid>

                <Grid item align="center" xs={12}>
                    <FormControl>
                        <TextField 
                        required={true} 
                        type="number" 
                        defaultValue={this.state.votesToSkip} 
                        onChange={this.handleVotesChange}
                        inputProps={{
                            min:1,
                            style : {textAlign:"center"}
                            }}/>

                        <FormHelperText>
                            <div align="center">Votes required to skip</div>
                        </FormHelperText>

                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButton() : this.renderCreateButton()}
            </Grid>
            
        )
    }
}