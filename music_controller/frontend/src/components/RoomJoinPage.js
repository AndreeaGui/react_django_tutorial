import React, {Component} from "react";

import { 
    Grid, 
    TextField, 
    Typography, 
    Button
 } from '@mui/material';

 import {Link} from 'react-router-dom'

export default class RoomJoinPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        }
        this._handleTestFieldChange = this._handleTestFieldChange.bind(this);
        this._roomButtonPressed = this._roomButtonPressed.bind(this);
    }

    

    render(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                    <TextField 
                        error={this.state.error}
                        label = 'Code'
                        placeholder="Enter a room code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this._handleTestFieldChange}
                        />
                </Grid>

                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={this._roomButtonPressed}>
                        Enter Room
                    </Button>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>

                

            </Grid>
        );
    }

    // underscore is for private methods
    _handleTestFieldChange(e){
        this.setState({
            roomCode: e.target.value
        })
    }

    _roomButtonPressed(){
        const requestOption = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };
        fetch('/api/join-room', requestOption)
        .then((response) => {
            if (response.ok){
                this.props.router.navigate('/room/'+this.state.roomCode)
            }else{
                this.setState({error: "room not found"})
            }
        }).catch((error) => {
            console.log(error)
        });
    }
}