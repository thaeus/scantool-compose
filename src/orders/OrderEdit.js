import React from 'react';
import YouTube from 'react-youtube';
import { createStore } from 'redux';
import VideoClip from './Clip.web';


export default class OrderEdit extends React.Component {
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
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return <VideoClip videoId='KT5Sk-62-pg' opts={opts} onReady={this._onReady} />;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
