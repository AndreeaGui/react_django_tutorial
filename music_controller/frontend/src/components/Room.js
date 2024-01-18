import React, {Component} from 'react';

export default class Room extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false
        };
        console.log(this.props);
        this.roomCode = this.props.router.params.roomCode;
        this.getRoomDetail();
    }

    getRoomDetail(){
        fetch('/api/get-room'+'?code='+this.roomCode)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        });
    }

    render(){
        return <div>
            <h3>{this.roomCode}</h3>
            <p>Votes: {this.state.votesToSkip}</p>
            <p>Guest can pause: {this.state.guestCanPause.toString()}</p>
            <p>Host: {this.state.isHost.toString()}</p>
        </div>
    }
}