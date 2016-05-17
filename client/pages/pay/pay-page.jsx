import React from 'react';
import styles from './pay.css';
import {connect} from 'react-redux';
import BillItem from '../../components/bill-item/bill-item.jsx';

export default class PayPage extends React.Component {
  param(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  updateState(data) {
    let billInfo = this.getBillInfo(data.bill);
    this.setState({
      'name': data.people.me.name,
      'picture': data.people.me.picture,
      'items': billInfo.items,
      'total': billInfo.total
    })
  }

  getBillInfo(bill) {
    let items = [];
    let total = 0;
    // loop over all the items in the bill
    let iKeys = Object.keys(bill);
    for (let iKey of iKeys) {
      let item = bill[iKey];
      // loop over every assignment and try to find Abhilash
      let aKeys = Object.keys(item.assignments);
      for (let aKey of aKeys) {
        let assignment = item.assignments[aKey];
        if (assignment.phone === '2485679221') {
          items.push({
            'price': item.price / Object.keys(item.assignments).length,
            'description': item.description
          })
          total += item.price / Object.keys(item.assignments).length;
        }
      }
    }
    return {
      items: items,
      total: total
    }
  }

  componentWillMount() {
    this.setState({});
    fetch('http://localhost:3000/' + this.param('id')).then(r => r.json())
    .then(data => {
      this.updateState(data);
    })
  }
  render() {
    return <article className="pay">
      <header>
        <div>
          <p>YOU OWE</p>
          <img className="picture" src={this.state.picture}></img>
          <p>{this.state.name}</p>
        </div>
      </header>
      <div className="scroller">
        <div className="inner-scroll">
          {Object.keys(this.state.items || {}).map(key => {
            let item = this.state.items[key];
            return <div className="list-item">
              <div className="list-item-name">{item.description}</div>
              <div className="list-item-price">${item.price.toFixed(2)}</div>
            </div>
          })}
          <div className="list-item list-item-total">
            <div className="list-item-name">Total Due</div>
            <div className="list-item-price">${(this.state.total || 0).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </article>;
  }
}
const exports = connect(state => ({
  people: state.root.people
})
)(PayPage);
export default exports;
