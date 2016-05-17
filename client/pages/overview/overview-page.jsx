import React from 'react';
import {connect} from 'react-redux';
import PieChart from 'react-simple-pie-chart';
import styles from './overview.css';
import {browserHistory} from 'react-router';
import PlaneLoader from '../../components/planeloader/planeloader.jsx';

export default class OverviewPage extends React.Component {
  componentWillMount() {
    let pKeys = Object.keys(this.props.people);
    this.slices = [];
    this.legendItems = [];
    for (let pKey of pKeys) {
      let person = this.props.people[pKey];
      this.slices.push({
        'color': person.colorCode,
        'value': person.amountDue
      });
      this.legendItems.push({
        'color': person.colorCode,
        'value': person.amountDue,
        'name': person.name
      });
    }
    this.setState({'isLoading': false});
  }
  goBack = () => {
    browserHistory.push('/bill');
  };
  confirm = () => {
    this.setState({
      'isLoading': true
    });
    fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(this.props.root)
    }).then(response => {
      setTimeout(() => {
        this.returnHome();
      }, 5000);
    });
  };
  returnHome() {
    this.props.dispatch({
      'type': 'UPDATE_ROUTE',
      'payLoad': '/'
    });
    this.props.dispatch({
      'type': 'RESET_STATE',
      'payLoad': ''
    });
    browserHistory.push('/');
  }
  renderOverview() {
    return <article className="overview">
      <h1>Group Overview</h1>
        <PieChart
        slices={this.slices}
      />
      <div className="legend">
        {this.legendItems.map((item, index) => {
          return <div className="legend-item">
            <div className="legend-color" style={{'backgroundColor': item.color}}></div>
            <p>{item.name + ' - $' + item.value.toFixed(2)}</p>
          </div>;
        })}
      </div>
      <div className="footer">
        <button className="overview-button btn-back" onClick={this.goBack}></button>
        <button className="overview-button btn-confirm" onClick={this.confirm}></button>
      </div>
    </article>;
  }

  renderLoader() {
    return <article className="paper-loader-container">
        <PlaneLoader></PlaneLoader>
        <p>Sending Notifications</p>
      </article>;
  }
  render() {
    return <article>
      {this.state.isLoading ?  this.renderLoader() : this.renderOverview()}
    </article>;
  }
}
const exports = connect(state => ({
  root: state.root,
  people: state.root.people
})
)(OverviewPage);
export default exports;
