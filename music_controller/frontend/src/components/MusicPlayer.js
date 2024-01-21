import React, {Component} from 'react';
import {
    Grid,
    Card,
    Typography,
    IconButton,
    LinearProgress
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';


export default class MusicPlayer extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        const songProgress = (this.props.time / this.props.duration) * 100;

        return (<Card>
            <Grid container alignItems="center">
                <Grid item align='center' xs={4}>
                    <img src={this.props.image_url} height="100%" width="100%" />
                </Grid>
                <Grid item align='center' xs={8}>
                    <Typography component="h5" variant="h5">
                        {this.props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {this.props.artist}
                    </Typography>
                    <div>
                        <IconButton>
                            {this.props.is_playing ? <PauseIcon/> : <PlayArrowIcon/>}
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon/>
                        </IconButton>
                    </div>
                </Grid>        
            </Grid>
            <LinearProgress variant='determinate' value={songProgress}/>
        </Card>);
    }
}