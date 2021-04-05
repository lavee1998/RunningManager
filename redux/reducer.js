import {
  GET_RUNNINGS,
  GET_RUNNING_BY_ID,
  REMOVE_RUNNING,
  SAVE_RUNNING,
  SET_DISTANCE,
  SET_INTERVAL,
  SET_START_DATE,
} from "./actions";
import { SAVE_CURRENTRUNNING } from "./runnings";

const initialState = {
  runnings: [
    {
      runCoordinates: [{ speed: 0 }],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      runCoordinates: [{speed: 0}],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      runCoordinates: [{speed: 0}],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      runCoordinates: [{speed: 0}],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      runCoordinates: [{speed: 0}],
      name: "Test run",
      startDate: "2012-12-21",
    },
  ],
  distance: null,
  interval: 6000,
  startDate: null,
  currentRunning: null,
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
    case SET_DISTANCE:
      return { ...state, goal: action.payload };
    case SET_START_DATE:
      return { ...state, startDate: action.payload };
    case SAVE_CURRENTRUNNING:

      let currRunning = {
        corrds: action.payload.coords,
        avgSpeed: action.payload.avgSpeed,
        topSpeed: action.payload.topSpeed,
        time: action.payload.time, 
        distance: action.payload.distance,
        setTime: action.payload.setTime, //settime
        setDistance: action.payload.setDistance, //setDistance
        startDate: action.payload.startDate,
        maxAltitude: action.payload.maxAltitude,
      }

      state = {
        ...state,
        currentRunning: currRunning
      };

      return state;
    default:
      return state;
  }
}

export default reducer;
