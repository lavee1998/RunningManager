import {
  GET_RUNNINGS,
  GET_RUNNING_BY_ID,
  REMOVE_RUNNING,
  SAVE_RUNNING
} from "./actions";

import {
  RUN_BASEDON_TIME ,
  RUN_BASEDON_DISTANCE ,
  FREE_RUN ,
  RUN_BASEDON_DISTANCE_TIME 
} from "./runnings"

const initialState = {
  runnings: [],
  currentRunningType: null,
  goal: null,
  interval: null,

};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RUNNINGS:
      return { ...state, runnings: action.payload };   // functions are not complementely implemented - Eszter
    case GET_RUNNING_BY_ID:
      return { ...state, runnings: action.payload };
    case SAVE_RUNNING:
      return { ...state, runnings: action.payload };
    case REMOVE_RUNNING:
      return { ...state, runnings: action.payload };
    default:
      return state;
  }
}

export default reducer;