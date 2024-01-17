import React, {Component} from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { 
    BrowserRouter as Router, 
    Route, 
    Link, 
    Redirect,
    Routes} from "react-router-dom";

export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<p>Homepage</p>}/>
                    <Route path="/join" element={<RoomJoinPage/>}></Route>
                    <Route path="/create" element={<CreateRoomPage/>}></Route>
                </Routes>
            </Router>
        )
    }
}