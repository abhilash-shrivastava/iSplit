import React from 'react';
import {connect} from 'react-redux';
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
  confirm = () => {
    this.setState({
      'isLoading': true
    });
    this.props.dispatch({
      'type': 'UPDATE_ROUTE',
      'payLoad': '/details'
    });
    browserHistory.push('/details');
  };
  renderOverview() {
    return <article className="overview">
      <h1>Group Overview</h1>
      <div className="footer">
        <button className="overview-button btn-back" onClick={this.goBack}></button>
        <button className="overview-button btn-confirm" onClick={this.confirm}></button>
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

const exports = connect(
)(OverviewPage);
export default exports;
