import React from 'react';
import styles from './details.css';
import TableView from 'react-table-view';

export default class DetailsPage extends React.Component {
  render() {
    return <article className="details">
      <div className="info-div">
        <p className="heading">YOU OWE</p>
        <img src="http://i.imgur.com/7JjkM0o.png"/>
        <p className="name">JOHN RAINIER</p>
      </div>
    </article>;
  }
}
