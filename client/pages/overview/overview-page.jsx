import React from 'react';
import PieChart from 'react-simple-pie-chart';
import styles from './overview.css';
import {browserHistory} from 'react-router';
export default class OverviewPage extends React.Component {
  navigateBack = () => {
    console.log('hey!');
    browserHistory.push('/bill');
  }
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
      <button className = "btn-back" onclick={this.navigateBack}></button>
      <button className = "btn-confirm"></button>
    </article>;
  }
}
