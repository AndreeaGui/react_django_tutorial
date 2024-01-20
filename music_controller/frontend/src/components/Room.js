import React, {Component} from 'react';
import {
    Grid,
    Button,
    Typography
} from '@mui/material'
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';


export default class Room extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {}
        };
        console.log(this.props);
        this.roomCode = this.props.router.params.roomCode;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.getRoomDetail = this.getRoomDetail.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetail();
        //this.getCurrentSong();
        
    }

    componentDidMount(){
        this.interval = setInterval(this.getCurrentSong, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    getRoomDetail(){
        fetch('/api/get-room'+'?code='+this.roomCode)
        .then((response) => {
            if(!response.ok){
                this.props.leaveRoomCallback();
                this.props.router.navigate('/');
            }
            return response.json()
        })
        .then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
            if (this.state.isHost){
                this.authenticateSpotify();
            }
        });
    }

    leaveButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/api/leave-room', requestOptions)
        .then((_response) => {
            this.props.leaveRoomCallback();
            this.props.router.navigate('/');
        });
    }

    updateShowSettings(value){
        this.setState({
            showSettings: value
        });
    }

    renderSettings(){
        return <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <CreateRoomPage 
                    update={true} 
                    votesToSkip={this.state.votesToSkip}
                    guestCanPause={this.state.guestCanPause}
                    roomCode={this.roomCode}
                    updateCallback={this.getRoomDetail}
                />
            </Grid>
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='secondary' onClick={() => this.updateShowSettings(false)}>
                    Close Settings
                </Button>
            </Grid>
        </Grid>
    }

    renderSettingsButton(){
        return(
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary' onClick={() => this.updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    authenticateSpotify(){
        fetch('/spotify/is-authenticated')
        .then((response) => response.json())
        .then((data) => {
            this.setState({spotifyAuthenticated: data.status});
            if (!data.status){
                fetch('/spotify/get-auth-url')
                .then((response) => response.json())
                .then((data) => {
                    window.location.replace(data.url)
                });
            }
        });
    }


    getCurrentSong(){
        fetch('/spotify/current-song')
        .then((response) => {
            if(!response.ok){
                return {};
            }else{
                return response.json();
            }
        })
        .then((data) => {
            this.setState({song: data});
            console.log(data);
        });
    }

    render(){
        if (this.state.showSettings){
            return this.renderSettings();
        }
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography variant='h4' component='h4'>Code: {this.roomCode}</Typography>
                </Grid>
                <MusicPlayer {...this.state.song}/>
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12} align='center'>
                    <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        ); 
    }
}
