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
    }


    render(){
        return <div>
            <h3>{this.roomCode}</h3>
            <p>Votes: {this.state.votesToSkip}</p>
            <p>Guest can pause: {this.state.guestCanPause}</p>
            <p>Host: {this.state.isHost}</p>
        </div>
    }
}