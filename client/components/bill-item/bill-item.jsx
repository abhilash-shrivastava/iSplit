import React from "react";
import styles from "./bill-item.css";
import {connect} from 'react-redux';
import 'rc-collapse/assets/index.css';
import Collapse, {Panel} from 'rc-collapse';
import ReactDom from 'react-dom';

export default class BillItem extends React.Component {
  slideDown = event => {
    event.persist();
    if (event.target.parentNode.className !== 'list-item') {
      return;
    }
    if (this.props.item.key !== this.props.expandedItemKey) {
      this.props.dispatch({
        'type': 'EXPAND_ITEM',
        'payLoad': this.props.item.key
      });
    } else {
      this.props.dispatch({
        'type': 'EXPAND_ITEM',
        'payLoad': null
      });
    }
  }
  render() {
    return <div onClick={this.slideDown}><Collapse activeKey={this.props.item.key === this.props.expandedItemKey ? '1' : null}>
        <Panel header={<div className="list-item">
              <div className="list-item-quantity">{this.props.item.quantity}</div>
              <div className="list-item-name">{this.props.item.description}</div>
              <div className="list-item-price">${this.props.item.price}</div>
            </div>} key="1">
          {this.renderSlideDown()}
        </Panel>
      </Collapse>
    </div>;
  }
  isPersonAssignedToMe(person) {
    if (this.props.item.assignedPeople) {
      return this.props.item.assignedPeople[person.key];
    }
    return false;
  }
  togglePerson = person => {
    this.props.dispatch({
      'type': 'TOGGLE_PERSON',
      'payLoad': {
        item: this.props.item,
        person: person
      }
    });
    this.forceUpdate();
  }
  getActiveClassForPerson = person => {
    if (this.props.item.assignments && this.props.item.assignments[person.key]) {
      return 'active';
    }
  }
  calculatePrice = person => {
    if (this.props.item.assignments && this.props.item.assignments[person.key]) {
      let num = this.props.item.price / Object.keys(this.props.item.assignments || {}).length;
      return (Math.round(num * 100) / 100).toFixed(2);
    } else {
      return '0.00';
    }
  }
  renderPeople() {
    if (this.props.people) {
      return Object.keys(this.props.people).map(key => {
        let person = this.props.people[key];
        return <div className={'list-item list-item-dropdown ' + this.getActiveClassForPerson(person)} style={{'backgroundColor' : person.colorCode}} onClick={() => this.togglePerson(person)} >
          <div className="checkbox">&nb</div>
          <div className="list-item-name">{person.name}</div>
          <div className="list-item-price">${this.calculatePrice(person)}</div>
        </div>;
      });
    } else {
      return null;
    }
  }
  showPersonCreator = () => {
    this.props.dispatch({
      'type':'CHANGE_PERSON_CREATER_VISIBLITY',
      'payLoad': true
    });
  };
  renderSlideDown() {
    return <span>
      {this.renderPeople()}
      <div className="list-item add-person" onClick={this.showPersonCreator}>
        <div className="add-person-icon"></div>
        <div>Add Person</div>
      </div>
    </span>;
  }
}
const exports = connect(state => ({
  expandedItemKey: state.root.expandedItemKey,
  people: state.root.people,
  personCreaterVisible: state.root.personCreaterVisible
}))(BillItem);
export default exports;
