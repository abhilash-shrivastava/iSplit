import React from 'react';
import styles from './bill.css';
import {connect} from 'react-redux';
import PersonCreater from '../../components/person-creater/person-creater.jsx';
import BillItem from '../../components/bill-item/bill-item.jsx';
import {browserHistory} from 'react-router';

export class BillPage extends React.Component {
  onSubmit = () => {
    browserHistory.push('/overview');
  }
  render() {
    return <article className="bill">
      <div className="bill-list">
        {Object.keys(this.props.bill || {}).map(key => {
          return <BillItem key={key} item={this.props.bill[key]}></BillItem>;
        })}
      </div>
      <button className="btn-crop" onClick={this.onSubmit}>
        Show Overview
      </button>
      {this.props.personCreaterVisible ? <PersonCreater></PersonCreater> : null }
    </article>;
  }
}
const exports = connect(state => ({
  bill: state.root.bill,
  personCreaterVisible: state.root.personCreaterVisible
}))(BillPage);
export default exports;
