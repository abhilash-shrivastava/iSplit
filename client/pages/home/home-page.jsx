import React from 'react';
import './home.css';
import {Link} from 'react-router';
import CameraButton from '../../components/camerabutton/camerabutton.jsx';

export default class HomePage extends React.Component {
  render() {
    return <article className="home">
      <h1>iSplit</h1>
      <h2>Sharing is Caring</h2>
      <CameraButton/>
    </article>;
  }
}
