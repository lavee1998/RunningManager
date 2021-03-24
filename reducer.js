import { combineReducers } from 'redux';

const INITIAL_STATE = {
  runs: [

  ],
  isRunning: false,
  
};

const friendsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {


    default:
      return state
  }
};

export default combineReducers({
  friends: friendsReducer
});