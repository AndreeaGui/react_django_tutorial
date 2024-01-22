import React, {Component} from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Info from "./Info";

import {
    Grid,
    Button,
    ButtonGroup,
    Typography
} from '@mui/material'

import { 
    BrowserRouter as Router, 
    Route, 
    Link, 
    Navigate,
    Routes,
} from "react-router-dom";

import withRouter from '../routing/withRouter';

const RoomWithRouter = withRouter(Room);
const CreateRoomPageWithRouter = withRouter(CreateRoomPage); //wraped to access props.router.navigate
const RoomJoinPageWithRouter = withRouter(RoomJoinPage);


export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: null
        }
        this.clearRoomCode = this.clearRoomCode.bind(this)
    }

    async componentDidMount(){
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                roomCode: data.code
            });
        });
    }

    renderHomePage(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Party
                    </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to='/join' component={Link}>Join a Room</Button>
                        <Button color="secondary" to='/create' component={Link}>Create a Room</Button>
                        <Button color="grey" to='/info' component={Link}>Info</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode(){
        this.setState({
            roomCode: null
        });
    }

    render(){
        console.log(this.state);
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={this.state.roomCode ? <Navigate to={`/room/${this.state.roomCode}`}/> : this.renderHomePage()}/>
                    <Route path="/join" element={<RoomJoinPageWithRouter/>}></Route>
                    <Route path="/create" element={<CreateRoomPageWithRouter/>}></Route>
                    <Route path="/info" element={<Info/>}></Route>
                    <Route path="/room/:roomCode" element={<RoomWithRouter leaveRoomCallback={this.clearRoomCode} />}></Route>
                </Routes>
            </Router>
        )
    }
}

//{<RoomWithRouter />}