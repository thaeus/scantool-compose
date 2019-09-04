import React, { Component } from 'react';
import Typist from 'react-typist';
import './main.scss';

export default class TypistMessage extends Component {
  state = {
    renderMsg: false
  };

  onHeaderTyped = () => {
    this.setState({ renderMsg: true });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    return (
      <div className="TypistExample">
        <Typist
          className="TypistExample-header"
          avgTypingDelay={5}
          startDelay={2000}
          onTypingDone={this.props.onTypingDone}
        >
          {this.props.message}
          <Typist.Delay ms={1000} />
        </Typist>
      </div>
    );
  }
}
