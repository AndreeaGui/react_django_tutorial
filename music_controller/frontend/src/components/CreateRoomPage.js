import React, {Component} from "react";
import Button from "@mui/material/Button"
import { 
    Grid, 
    TextField, 
    Typography, 
    FormHelperText, 
    FormControl, 
    FormControlLabel,
    Radio,
    RadioGroup,
    Collapse
 } from '@mui/material';
import { Link } from "react-router-dom"


export default class CreateRoomPage extends Component{
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {}
    };

    constructor(props){
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            errorMsg: "",
            successMsg: ""
        };
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }

    handleVotesChange(e){
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange(e){
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false,
        });
    }

    handleRoomButtonPressed(){
        //console.log(this.state);
        const requestOption = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        fetch('/api/create-room', requestOption)
            .then((response) => response.json())
            .then((data) => this.props.router.navigate('/room/'+data.code));
    }

    handleUpdateButtonPressed(){
        const requestOption = {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            })
        };
        fetch('/api/update-room', requestOption)
            .then((response) => {
                if (response.ok){
                    this.setState({
                        successMsg: "Room updated successfully!"
                    });
                }else{
                    this.setState({
                        errorMsg: "Error updating room"
                    });
                }
                this.props.updateCallback();     
            });
    }

    renderCreateButtons(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>
                        Create A Room
                    </Button>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        );
    }

    renderUpdateButtons(){
        return (
            <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleUpdateButtonPressed}>
                        Update Room
                    </Button>
            </Grid>
        );
    }


    render(){
        const title = this.props.update ? "Update Room" : "Create A Room"
        console.log('state', this.state);

        return <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={this.state.errorMsg !="" || this.state.successMsg != ""}>
                    {this.state.successMsg}
                </Collapse>
            </Grid>

            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    {title}
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div alig='center'>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue={this.state.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
                        <FormControlLabel 
                            value="true"  
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />

                        <FormControlLabel 
                            value="false"  
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />

                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                        required={true} 
                        type="number" 
                        onChange={this.handleVotesChange}
                        defaultValue={this.state.votesToSkip}
                        inputProps={{
                            min: 1,
                            style: {textAlign: "center"}
                        }}
                    />
                    <FormHelperText>
                        <div align='center'>
                            Votes required to skip song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
        </Grid>
    }
}