import React from 'react';
import YouTube from 'react-youtube';
import { createStore } from 'redux';

export default class VideoClip extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { num: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ num: 2 });
  }

  render() {


  



    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return <div><YouTube videoId={this.props.videoId} onReady={this._onReady} /></div>;

  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
