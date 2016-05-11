import React from "react";
import styles from "./bill-item.css";
export default class BillItem extends React.Component {
  render() {
    return <div className="list-item">
      <div className="list-item-quantity">{this.props.item.quantity}</div>
      <div className="list-item-name">{this.props.item.name}</div>
      <div className="list-item-price">${this.props.item.price}</div>
    </div>;
  }
}
