import React from "react";
import styles from "./bill-item.css";
import {connect} from 'react-redux';
export default class BillItem extends React.Component {
  slideDown = () => {
    this.props.dispatch({
      'type': 'EXPAND_ITEM',
      'payLoad': this.props.item.key
    });
  }
  increase = (person) => {
    person.quantity++;
    this.props.dispatch({
      'type': 'INCREASE_QUANTITY_ASSIGNED',
      'payLoad': {
        'key': this.props.item.key,
        'email': person.email
      }
    });
  }
  render() {
    return <div>
      <div className="list-item" onClick={this.slideDown}>
        <div className="list-item-quantity">{this.props.item.quantity}</div>
        <div className="list-item-name">{this.props.item.description}</div>
        <div className="list-item-price">${this.props.item.price}</div>
      </div>
      {this.props.item.key === this.props.expandedItemKey ? this.renderSlideDown() : null}
    </div>;
  }
  renderSlideDown() {
    if (this.props.item.people) {
      return this.props.item.people.map((person, index) => {
        return <div className="list-item list-item-dropdown" style={{'background-color' : person.colorCode}}>
          <div className="list-item-quantity">{person.quantity}</div>
          <div className="btn-minus"></div>
          <div className="btn-plus"></div>
          <div className="list-item-name">{person.name}</div>
          <div className="list-item-price">${person.quantity === 0 ? 0 : this.props.item.price / person.quantity}</div>
        </div>;
      });
    } else {
      return null;
    }
  }
}
const exports = connect(state => ({
  expandedItemKey: state.root.expandedItemKey,
  people: state.root.people,
  personCreaterVisible: state.root.personCreaterVisible
}))(BillItem);
export default exports;
