let lastTm = 0;
let arr = [];
let warned = 0;
let letDistance = 0;
let first = 3;

const [tooSlow, setTooSlow] = React.useState(false);

const [averageSpeed, setAverageSpeed] = React.useState(0);
const [currentSpeed, setCurrentSpeed] = React.useState(0);
const [distance, setDistance] = React.useState(0);
const [runCoordinates, setCoordinates] = React.useState([]);
export default (currLocation) => {

  if (arr.length) {
    const lastTimeStamp = arr[arr.length - 1].timestamp;
    const lastLocation = arr[arr.length - 1];
    const slow = 5;
    const currDistance = getDistance(lastLocation, currLocation.coords);
    currLocation.coords.speed = calculateAvg(
        currDistance,
        currLocation.timestamp - (lastTm ? lastTm : lastTimeStamp)
    );
    setAverageSpeed(
        calculateAvg(letDistance, currLocation.timestamp - arr[0].timestamp)
    );

    if (currDistance > 0.005 && currLocation.coords.speed < 40) {
        letDistance = toFixing(parseFloat(letDistance) + currDistance, 3);
        setDistance(letDistance);
        isStopped(!(currDistance > 0.005));
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
        setCurrentSpeed(arr[arr.length - 1].speed);
        setTooSlow(arr[arr.length - 1].speed < slow);
        } else arr[arr.length-1].speed = 0;

        setCoordinates(arr);
    }

    if (goal * 0.95 <= letDistance && warned === 0) {
        warned = warned + 1;
        almostReachedDistance();
    }
    if (goal <= letDistance && warned === 1) {
        warned = warned + 1;
        reachedDistance();
    }
  } else {
    if (first === 0) {
        currLocation.coords.speed = 0;
        currLocation.coords.timestamp = currLocation.timestamp;
        arr = [...arr, currLocation.coords];
        setCoordinates(arr);
    } else {
        first = first - 1;
        }
  }
}
