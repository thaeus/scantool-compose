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
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import { translate } from 'react-admin';
import VideoSlider from './VideoSlider';
import axios from 'axios';
import PubSub from 'pubsub-js';

export default class ScanFlip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showScanner: true,
      video: 'qpT5Md4TPJg',
      toggler: false,
      result: 'No result',
      isFull: false,
      isFlipped: false,
      message: 'Get your walmart receipts and start scanning!',
      error: false
    };
    this.handleScan = this.handleScan.bind(this);
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


      console.log("readdddd " + rawScan);

      axios.get('http://localhost:7000/candidate/scan?matric_value='+rawScan)
      .then(elec => {
        PubSub.publish('card1.scan', elec.data.card1);
        console.log(this.state)
        console.log(elec.data)
      })


    }
  }

  handleError(err) {
    console.error(err);
  }



  getMainScanner() {
    return <X3LenseScanner onScan={this.handleScan} />;
  }

  render() {
    
    return (

    <div >
      {this.getMainScanner()}
    </div>

    );
  }
}
