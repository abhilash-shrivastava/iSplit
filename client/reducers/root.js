import {combineReducers} from 'redux';
import {browserHistory} from 'react-router';

const defaultState = {
  'image': {},
  'expandedItemKey': null,
  'colors': [
    '#AA9D97',
    '#DBF0FB',
    '#F2CAF6',
    '#e7edf3',
    '#e3e0ef',
    '#f2e6f2',
    '#F3F3A5',
    '#D8FAFD'
  ],
  'personCreaterVisible': false,
  'me' : {},
  'people': {
    'jens@jens': {
      'colorCode' : '#E1DDCB',
      'email': 'jens@jens',
      'name': 'Jens Vanderhaeghe'
    }
  },
  'path': window.location.pathname,
  'bill': {},
  'billTotal' : 0
};

function root(state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'EXPAND_ITEM': {
      newState.expandedItemKey = action.payLoad;
      break;
    }
    case 'TOGGLE_PERSON': {
      let item = newState.bill[action.payLoad.item.key];
      let person = action.payLoad.person;
      if (item.assignments[person.email]) {
        if (Object.keys(item.assignments).length > 1) {
          delete item.assignments[person.email];
        }
      } else {
        item.assignments[person.email] = person;
      }

      let pKeys = Object.keys(newState.people);
      console.log(pKeys);
      var iKeys = Object.keys(newState.bill);
      for (let pKey of pKeys) {
        newState.people[pKey].amountDue = 0;
      }
      for (let iKey of iKeys) {
        let item2 = newState.bill[iKey];
        console.log(item2);
        let aKeys = Object.keys(item2.assignments);
        for (let aKey of aKeys) {
          console.log(aKey);
          newState.people[aKey].amountDue += parseFloat(item2.price / aKeys.length);
        }
      }
      break;
    }
    case 'ADD_PERSON': {
      let person = action.payLoad;
      person.amountDue = 0;
      person.colorCode = newState.colors.pop();
      newState.people[person.email] = person;
      newState.personCreaterVisible = false;
      break;
    }
    case 'SET_BILL': {
      newState.bill = {};
      let total = 0;
      let myKey = Object.keys(newState.people)[0];
      let me = newState.people[myKey];
      for (let item of action.payLoad) {
        item.assignments = {};
        item.assignments[myKey] = newState.people[myKey];
        newState.bill[item.key] = item;
        total += parseFloat(item.price);
      }
      newState.billTotal = total;
      me.amountDue = total;
      break;
    }
    case 'UPDATE_ROUTE': {
      newState.path = action.payLoad;
      newState.personCreaterVisible = false;
      break;
    }
    case 'CHANGE_PERSON_CREATER_VISIBLITY': {
      newState.personCreaterVisible = action.payLoad;
      break;
    }
    case 'ADD_IMAGE': {
      newState.image = action.payLoad;
      break;
    }
    default: {
      break;
    }
  }
  return newState;
}
const RootReducer = combineReducers({
  root
});
export default RootReducer;
