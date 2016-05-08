import {combineReducers} from 'redux';

const defaultState = {
  'image':'',
  'bill': []
};

function root(state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
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
