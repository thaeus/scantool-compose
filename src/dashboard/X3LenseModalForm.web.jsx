import React from 'react';
import ReactDOM from 'react-dom';

export default class X3LenseModalForm extends React.Component {
  state = {
    open: false
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    return <div></div>;
  }
}
