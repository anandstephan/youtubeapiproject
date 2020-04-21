import React from 'react';
import {Grid} from '@material-ui/core';
import youtube from './api/youtube';
import VideoList from './components/VideoList';
import {SearchBar,VideoDetails} from './components'; 

class App extends React.Component{

    state={
        videos:[],
        selectedVideo:null
    }
    componentDidMount(){
        this.handleSubmit('Online Quiz System project in php -part#1');
    }
    onVideoSelect = (video)=>{
        this.setState({selectedVideo:video});
    }
    handleSubmit = async (searchTerm)=>{
     const response = await youtube.get('search',{
        params:{
            part:'snippet',
            maxResults:5,
            key:'AIzaSyCemDMBGDcFqAHn0syDEMDS8zeC59wzF0o',
            q:searchTerm
        }
     });
     this.setState({
         videos:response.data.items,
         selectedVideo:response.data.items[0]
     })
    }
    render(){
        const {selectedVideo,videos} = this.state;
        return(
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <SearchBar onFormSubmit={this.handleSubmit}/>
                </Grid>
                <Grid item xs={8}>
                <VideoDetails video={selectedVideo}/>
                </Grid>
                <Grid item xs={4}>
                <VideoList videos = {videos} onVideoSelect={this.onVideoSelect}/>
                </Grid>
            </Grid>
        );
    }
}

export default App;