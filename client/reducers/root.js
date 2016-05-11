import {combineReducers} from 'redux';
import {browserHistory} from 'react-router';

const defaultState = {
  'image':'',
  'personCreaterVisible': false,
  'people':[],
  'path': window.location.pathname,
  'bill': [{
    "name": "vestibulum sit amet cursus",
    "quantity": 6,
    "price": 18.46
  }, {
    "name": "proin",
    "quantity": 3,
    "price": 10.72
  }, {
    "name": "ut erat curabitur",
    "quantity": 5,
    "price": 12.53
  }, {
    "name": "a ipsum integer a nibh",
    "quantity": 7,
    "price": 21.04
  }, {
    "name": "erat quisque erat",
    "quantity": 4,
    "price": 21.91
  }, {
    "name": "id luctus",
    "quantity": 1,
    "price": 5.72
  }, {
    "name": "consectetuer adipiscing",
    "quantity": 3,
    "price": 15.31
  }, {
    "name": "morbi a",
    "quantity": 6,
    "price": 16.01
  }, {
    "name": "ut volutpat sapien arcu sed",
    "quantity": 2,
    "price": 1.03
  }, {
    "name": "vestibulum",
    "quantity": 1,
    "price": 5.06
  }, {
    "name": "sem mauris",
    "quantity": 10,
    "price": 24.21
  }, {
    "name": "mauris sit amet",
    "quantity": 6,
    "price": 10.46
  }]
};

function root(state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'ADD_PERSON': {
      newState.people.push(action.payLoad);
      newState.personCreaterVisible = false;
      console.log(newState);
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
