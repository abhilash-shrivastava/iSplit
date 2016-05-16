import React from 'react';
import PieChart from 'react-simple-pie-chart';
import styles from './overview.css';
import {browserHistory} from 'react-router';
import PlaneLoader from '../../components/planeloader/planeloader.jsx';

export default class OverviewPage extends React.Component {
  componentWillMount() {
    this.setState({'isLoading': false});
  }
  goBack = () => {
    browserHistory.push('/bill');
  };
  renderOverview() {
    return <article className="overview-article">
      <div className="overview">
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
      <button className = "btn-back" onClick={this.goBack}></button>
      <button className = "btn-confirm"></button>
    </div>
    </article>;
  }

  renderLoader() {
    return <article className="overview-page">
        <PlaneLoader></PlaneLoader>
        <p>Sending Notification</p>
      </article>;
  }
  render() {
    return <article>
      {this.state.isLoading ?  this.renderLoader() : this.renderOverview()}
    </article>;
  }
}
