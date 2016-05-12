import {combineReducers} from 'redux';
import {browserHistory} from 'react-router';

const defaultState = {
  'image': {},
  'expandedItemKey': null,
  'colors': [
    '#e7edf3',
    '#e3e0ef',
    '#f2e6f2'
  ],
  'personCreaterVisible': false,
  'people':[],
  'path': window.location.pathname,
  'bill': []
};

function root(state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'EXPAND_ITEM': {
      newState.expandedItemKey = action.payLoad;
      break;
    }
    case 'ADD_PERSON': {
      let person = action.payLoad;
      person.colorCode = newState.colors.pop();
      newState.people.push(person);
      newState.personCreaterVisible = false;
      for (let item of newState.bill) {
        var itemPerson = Object.assign({}, person);
        itemPerson.quantity = 0;
        if (!item.people) {
          item.people = [];
        }
        item.people.push(itemPerson);
      }
      break;
    }
    case 'INCREASE_QUANTITY_ASSIGNED': {
      for (let item of newState.bill)  {
        console.log('test');
        if (item.key === action.payLoad.key) {
          for (let person of item.people) {
            if (person.email === action.payLoad.email) {
              person.quantity = person.quantity++;
            }
          }
        }
      }
      break;
    }
    case 'DECREASE_QUANTITY_ASSIGNED': {
      for (let item of newState.bill)  {
        if (item.key === action.payLoad.key) {
          for (let person of item.people) {
            if (person.email === action.payLoad.email) {
              person.quantity--;
            }
          }
        }
      }
      break;
    }
    case 'SET_BILL': {
      newState.bill = action.payLoad;
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
