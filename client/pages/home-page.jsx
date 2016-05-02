import React from 'react';
import {Link} from 'react-router';

export default class HomePage extends React.Component {
  render() {
    return <article>
      Hello from Home
      <Link to="/crop">Crop</Link>
    </article>;
  }
}
