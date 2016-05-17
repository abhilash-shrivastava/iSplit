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
  'path': window.location.pathname,
  'bill': {},
  'people': {
    'me': JSON.parse(localStorage.getItem('me')) || null
  },
  'billTotal' : 0
};

function makeid() {
  var text = '';
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function root(state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'ADD_ME': {
      let me = action.payLoad;
      localStorage.setItem('me', JSON.stringify(action.payLoad));
      newState.people.me = me;
      break;
    }
    case 'RESET_STATE': {
      newState = defaultState;
      break;
    }
    case 'EXPAND_ITEM': {
      newState.expandedItemKey = action.payLoad;
      break;
    }
    case 'TOGGLE_PERSON': {
      let item = newState.bill[action.payLoad.item.key];
      let person = action.payLoad.person;
      if (item.assignments[person.key]) {
        if (Object.keys(item.assignments).length > 1) {
          delete item.assignments[person.key];
        }
      } else {
        item.assignments[person.key] = person;
      }

      let pKeys = Object.keys(newState.people);
      var iKeys = Object.keys(newState.bill);
      for (let pKey of pKeys) {
        newState.people[pKey].amountDue = 0;
      }
      for (let iKey of iKeys) {
        let item2 = newState.bill[iKey];
        let aKeys = Object.keys(item2.assignments);
        for (let aKey of aKeys) {
          newState.people[aKey].amountDue += parseFloat(item2.price / aKeys.length);
        }
      }
      break;
    }
    case 'ADD_PERSON': {
      let person = action.payLoad;
      person.amountDue = 0;
      person.colorCode = newState.colors.pop();
      person.key = makeid();
      newState.people[person.key] = person;
      newState.personCreaterVisible = false;
      break;
    }
    case 'SET_BILL': {
      newState.bill = {};
      let total = 0;
      let me = newState.people.me;
      for (let item of action.payLoad) {
        item.assignments = {};
        item.assignments.me = newState.people.me;
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
