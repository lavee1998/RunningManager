import {
  GET_RUNNINGS,
  GET_RUNNING_BY_ID,
  REMOVE_RUNNING,
  SAVE_RUNNING,
} from "./actions";


const initialState = {
  runnings: [],
  currentRunningType: null,
  goal: null,
  interval: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RUNNINGS:
      return { ...state, runnings: action.payload }; // functions are not complementely implemented - Eszter
    case GET_RUNNING_BY_ID:
      return { ...state, runnings: action.payload };
    case SAVE_RUNNING:
      return { ...state, runnings: action.payload };
    case REMOVE_RUNNING:
      return { ...state, runnings: action.payload };
    case SET_INTERVAL:
      return { ...state, interval: action.payload };
    case SET_GOAL:
      return { ...state, goal: action.payload };
    default:
      return state;
  }
}

export default reducer;
