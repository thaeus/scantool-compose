import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import md5 from 'md5';
import { string } from 'postcss-selector-parser';

export default class X3LenseScanner extends Component {
  constructor(props) {
    super(props);
    var packages = {};

    this.state = {
      delay: 500,
      result: 'No result'
    };
  }

  handleError(err) {
    console.error(err);
  }
  render() {
    var onScan = this.props.onScan;
    return (
      <div>
        <QrReader delay={this.state.delay} onError={this.handleError} onScan={onScan} />
      </div>
    );
  }
}
