import React from 'react';
import PieChart from 'react-simple-pie-chart';
import styles from './overview.css';

export default class OverviewPage extends React.Component {
  render() {
    return <article className="overview">
      <p className = "heading">Group Overview</p>
      <PieChart className="pie"
      slices={[
        {
          color: '#6666ff',
          value: 10
        },
        {
          color: '#ff99ff',
          value: 10
        },
        {
          color: '#b3cce6',
          value: 10
        }
      ]}
    />
      <div id="rectangle1"></div><div className = "text">Jens</div>
      <div id="rectangle2"></div><div className = "text">Madhura</div>
      <div id="rectangle3"></div><div className = "text">Abhilash</div>
      <button className = "btn-back"></button>
      <button className = "btn-confirm"></button>
    </article>;
  }
}
