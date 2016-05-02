import React from 'react';
import './camerabutton.css';
import 'react-fastclick';

import { browserHistory } from 'react-router'
export default class CameraButton extends React.Component {
  handleClick() {
    browserHistory.push('/crop');
  }
  render() {
    return <button className="btn-camera" onClick={this.handleClick}>
      START
    </button>;
  }
}
