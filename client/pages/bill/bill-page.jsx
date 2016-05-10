import React from 'react';
import styles from './bill.css';
import liststyles from './list.css';
import {connect} from 'react-redux';

export class BillPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return <article className="bill">
      <div className="bill-list">
        {this.props.bill.map(function(item, index) {
          return <div className="list-item">
            <div className="list-item-quantity">{item.quantity}</div>
            <div className="list-item-name">{item.name}</div>
            <div className="list-item-price">{item.price}</div>
          </div>;
        })}
      </div>
    </article>;
  }
}
const exports = connect(state => ({
  bill: state.root.bill
}))(BillPage);
export default exports;
