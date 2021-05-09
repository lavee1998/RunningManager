import {
  REMOVE_RUNNING,
  SAVE_RUNNING,
  UPDATE_RUNNING,
  SET_DISTANCE,
  SET_INTERVAL,
  SET_START_DATE,
  SET_IS_RUNNING,
  SAVE_CURRENTRUNNING
} from "./actions";

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
      runCoordinates: [{ speed: 0 }],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      id: -3,
      runCoordinates: [{ speed: 0 }],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      id: -4,
      runCoordinates: [{ speed: 0 }],
      name: "Test run",
      startDate: "2012-12-21",
    },
    {
      id: -5,
      runCoordinates: [{ speed: 0 }],
      name: "Test run",
      startDate: "2012-12-21",
    },
  ],
  distance: null,
  interval: null,
  startDate: null,
  currentRunning: null,
  isRunning: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_RUNNING:
      let newId;
      if (state.runnings.length == 0) {
        newId = 1;
      } else {
        newId = state.runnings[0].id + 1; // the Redux puts the new elements to the beginning, thus there will be the biggest id.
      }

      let newRunning = {
        id: newId,
        name: action.payload.name,
        runCoordinates: action.payload.runCoordinates,
        avgSpeed: action.payload.avgSpeed,
        topSpeed: action.payload.topSpeed,
        time: action.payload.time,
        timeStamp: action.payload.timeStamp,
        distance: action.payload.distance,
        setTime: action.payload.setTime, //settime
        setDistance: action.payload.setDistance, //setDistance
        stopCounter: action.payload.stopCounter,
        startDate: action.payload.startDate,
        maxAltitude: action.payload.maxAltitude,
      };

      state = {
        ...state,
        runnings: [newRunning, ...state.runnings],
      };

      return state;
    case REMOVE_RUNNING:
      state.runnings = state.runnings.filter((x) => x.id != action.payload.id);

      state = {
        ...state,
        runnings: [...state.runnings],
      };

      return state;
    case UPDATE_RUNNING:
      state.runnings.find((x) => x.id == action.payload.id).name =
        action.payload.name;

      return state;
    case SET_INTERVAL:
      return { ...state, interval: action.payload };
    case SET_DISTANCE:
      return { ...state, goal: action.payload };
    case SET_IS_RUNNING:
      return { ...state, isRunning: action.payload };
    case SET_START_DATE:
      return { ...state, startDate: action.payload };
    case SAVE_CURRENTRUNNING:
      let currRunning = {
        id: action.payload.id ? action.payload.id : 0,
        name: action.payload.name ? action.payload.name : "Default name",
        runCoordinates: action.payload.runCoordinates,
        avgSpeed: action.payload.avgSpeed,
        topSpeed: action.payload.topSpeed,
        time: action.payload.time,
        timeStamp: action.payload.timeStamp,
        distance: action.payload.distance,
        setTime: action.payload.setTime, 
        stopCounter: action.payload.stopCounter,
        setDistance: action.payload.setDistance, 
        startDate: action.payload.startDate,
        maxAltitude: action.payload.maxAltitude,
      };

      state = {
        ...state,
        currentRunning: currRunning,
      };

      return state;
    default:
      return state;
  }
}

export default reducer;
