import React from 'react';
import styles from './details.css';
import {connect} from 'react-redux';
import BillItem from '../../components/bill-item/bill-item.jsx';


export default class DetailsPage extends React.Component {
  componentWillMount() {
    let pKeys = Object.keys(this.props.people);

    for (let pKey of pKeys) {
      let person = this.props.people[pKey];
    }
  }
  render() {
    return <article className="details" >
      <div className="info-div" id="top">
        <p className="heading">YOU OWE</p>
        <img src="http://i.imgur.com/7JjkM0o.png"/>
        <p className="name">JOHN RAINIER</p>
      </div>
      <div className="bill-list" id="bottom">
        {Object.keys(this.props.people || {}).map(key => {
          return <BillItem key={key} item={this.props.people[key]}></BillItem>;
        })}
      </div>
    </article>;
  }
}
const exports = connect(state => ({
  people: state.root.people
})
)(DetailsPage);
export default exports;
