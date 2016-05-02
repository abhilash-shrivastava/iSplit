import React from 'react';
import {Link} from 'react-router';

export default class CropPage extends React.Component {
  render() {
    return <div>
      Hello from crop
      <Link to="/">Home</Link>
    </div>;
  }
}
