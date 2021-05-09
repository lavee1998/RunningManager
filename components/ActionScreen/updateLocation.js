
import getCopiedLocation from "./getCopiedLocation";
import getDistanceOfLastElements from "./getDistanceOfLastElements";
import getDistance from "./getDistance";
import toFixing from "./toFixing";
import calculateAvg from "./calculateAvg";
    let lastTm = 0;
    let arr = [];
    let letDistance = 0;
    let first = 3;
    let tooSlow = false;
    let averageSpeed = 0;
    let currentSpeed = 0;
    let coordinates = [];
export default (currLocation,inp,newTest=false) => {
  if(newTest){
    lastTm = 0;
    arr = [];
    letDistance = 0;
    first = 3;
    tooSlow = false;
    averageSpeed = 0;
    currentSpeed = 0;
    coordinates = [];
  }
  if (arr.length) {
    const lastTimeStamp = arr[arr.length - 1].timestamp;
    const lastLocation = arr[arr.length - 1];
    const slow = 5;
    const currDistance = getDistance(lastLocation, currLocation.coords);
    currLocation.coords.speed = calculateAvg(
        currDistance,
        currLocation.timestamp - (lastTm ? lastTm : lastTimeStamp)
    );
    averageSpeed=
        calculateAvg(letDistance, currLocation.timestamp - arr[0].timestamp);
    if (currDistance > 0.005 && currLocation.coords.speed < 40) {
        letDistance = toFixing(parseFloat(letDistance) + currDistance, 3);
        lastTm = 0;
        currLocation.coords.timestamp = currLocation.timestamp;
        arr = [...arr, currLocation.coords];
    } else {
        if (!lastTm) lastTm = arr[arr.length - 1].timestamp;
        arr = [...arr, getCopiedLocation(arr,currLocation).coords];
    }
    if (currLocation.coords.speed < 40) {


        if (arr.length > 7) { //moving avg
        
        arr[arr.length - 1].speed = calculateAvg(
            getDistanceOfLastElements(arr,6),
            arr[arr.length - 1].timestamp - arr[arr.length - 7].timestamp
        ); //interpolated curr speed
        currentSpeed=arr[arr.length - 1].speed;
        tooSlow=arr[arr.length - 1].speed < slow;
        } else arr[arr.length-1].speed = 0;

        coordinates=arr;
    }

  } else {
    if (first === 0) {
        currLocation.coords.speed = 0;
        currLocation.coords.timestamp = currLocation.timestamp;
        arr = [...arr, currLocation.coords];
        coordinates=arr;
    } else {
        first = first - 1;
        }
  }
  // test phases
  if(inp===0)
    return arr;
  if(inp===1)
    return lastTm;
  if(inp===2)
    return letDistance;
  if(inp===3)
    return first;
  if(inp===4)
    return tooSlow;
  if(inp===5)
    return coordinates;
}
