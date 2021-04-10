import {
  REMOVE_RUNNING,
  SAVE_RUNNING,
  UPDATE_RUNNING,
  SET_DISTANCE,
  SET_INTERVAL,
  SET_START_DATE,
} from "./actions";
import { SAVE_CURRENTRUNNING } from "./runnings";

const initialState = {
  runnings: [
    {
      id: 0,
      runCoordinates: [{ speed: 0 }],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      id: -2,
      runCoordinates: [{speed: 0}],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      id: -3,
      runCoordinates: [{speed: 0}],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      id: -4,
      runCoordinates: [{speed: 0}],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      id: -5,
      runCoordinates: [{speed: 0}],
      name: "Test run",
      startDate: "2012-12-21",
    },
  ],
  distance: null,
  interval: null,
  startDate: null,
  currentRunning: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_RUNNING:

      let newId;
      if(state.runnings.length == 0) {
        newId = 1;
      } else {
        newId = state.runnings[0].id + 1;  // the Redux puts the new elements to the beginning, thus there will be the biggest id.
      }

      let newRunning = {
        id: newId,
        name:action.payload.name,
        runCoordinates: action.payload.coords,
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
        runnings: [newRunning, ...state.runnings],
      };

      return state;
    case REMOVE_RUNNING:

      state.runnings = state.runnings.filter(x => x.id != action.payload.id);

      state = {
        ...state,
        runnings: [...state.runnings],
      };

      return state;
    case UPDATE_RUNNING: //!!MISSING
      return state;
    case SET_INTERVAL:
      return { ...state, interval: action.payload };
    case SET_DISTANCE:
      return { ...state, goal: action.payload };
    case SET_START_DATE:
      return { ...state, startDate: action.payload };
    case SAVE_CURRENTRUNNING:

      let currRunning = {
        id: 0,
        name: "Default name",
        runCoordinates: action.payload.coords,
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
