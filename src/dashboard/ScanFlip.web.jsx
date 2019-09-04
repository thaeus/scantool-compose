/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react';
import Fullscreen from 'react-full-screen';
// import QrReader from 'react-qr-reader'
import md5 from 'md5';
import { string } from 'postcss-selector-parser';
import FsLightbox from 'fslightbox-react';
import ReactCardFlip from 'react-card-flip';
import X3LenseScanner from './x3lense.web';
import TypistMessage from './TypistMessage.web';
import VideoClip from './Clip.web';

export default class ScanFlip extends React.Component {
  constructor(props) {
    super(props);
    var vids = [
      // eslint-disable-next-line prettier/prettier
      ['Trnbv4d-JBs', '#1'],
      ['qpT5Md4TPJg', '#2'],
      ['rF8ieTby4VI', '#3'],
      ['J1dVkhF9CPw', '#4'],
      ['cqyziA30whE', '#5'],
      ['iX0UHxazZ5o', '#6'],
      ['68uUeZGppXw', '#7'],
      ['oaN_sWyTW24', '#8'],
    ];

    this.state = {
      video: 'qpT5Md4TPJg',
      toggler: false,
      result: 'No result',
      isFull: false,
      isFlipped: false,
      message: 'Get your walmart receipts and start scanning!',
      vids: vids,
      error: false
    };
    this.handleScan = this.handleScan.bind(this);
    this.loadCampaignVideo = this.loadCampaignVideo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }


  componentDidMount() {
    //this.setState({ toggler: true });
    //this.goFull();
  }


  handleScan(result) {
    if (result) {
      var rawScan = result;
      var isWally = result.includes("wmt");
      if(!isWally) {
        this.setState({ message: "Sorry, invalid gamepiece (" +result + ") Please scan a walmart receipt to play this game!" });
        this.setState({ plink: Date.now() });
        this.setState({ error: true });
        return;
      }

      var res = result + '777 Thank You Universe For Waking Me UP!!! Much love from the 619 forever <3 Thaeus XI';
      var resmd5 = md5(res);
      var switchChar = resmd5.charAt(0);
      var returnArray;
      switch (switchChar) {
        case '0':
        case '8':
          returnArray = this.state.vids[0];
          break;
        case '1':
        case '9':
          returnArray = this.state.vids[1];
          break;
        case '2':
        case 'a':
          returnArray = this.state.vids[2];
          break;
        case '3':
        case 'b':
          returnArray = this.state.vids[3];
          break;
        case '4':
        case 'c':
          returnArray = this.state.vids[4];
          break;
        case '5':
        case 'd':
          returnArray = this.state.vids[5];
          break;
        case '6':
        case 'e':
          returnArray = this.state.vids[6];
          break;
        case '7':
        case 'f':
          returnArray = this.state.vids[7];
          break;
      }

      var message = "Reading gamepiece... " + rawScan + " (Congratulations, you found resume video " + returnArray[1] + ")";
      this.setState({ plink: Date.now() });
      this.setState({ video: returnArray[0] });
      this.setState({ message: message});
      this.setState({ openOnMount: true });
      this.setState({ error: false });

      

    }
  }

  handleError(err) {
    console.error(err);
  }

  loadCampaignVideo() {
    if(this.state.error === false) {
      this.setState({
        toggler: true
      });
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
  }

  clearStateVideo = () => {
    this.setState({
      video: '',
      toggler: false
    });
  };



  render() {
    return (

    <div>
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <div key="front">
          <X3LenseScanner onScan={this.handleScan} />
        </div>
        <div key="back">
          <FsLightbox
              key={this.state.plink} 
              toggler={this.state.toggler}
              sources={[
                'https://www.youtube.com/watch?v=' + this.state.video,
              ]}
              openOnMount={true}
          />
        </div>
      </ReactCardFlip>
      <TypistMessage onTypingDone={this.loadCampaignVideo} message={this.state.message} key={this.state.plink} />
      <button onClick={this.handleClick}>Click for scanner</button>
    </div>

    );
  }
}
