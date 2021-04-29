export default (array,currLoc)=>{
    
    currLoc.coords.accuracy=array[array.length - 1].accuracy;
    currLoc.coords.altitude=array[array.length - 1].altitude;
    currLoc.coords.altitudeAccuracy=array[array.length - 1].altitudeAccuracy;
    currLoc.coords.heading=array[array.length - 1].heading;
    currLoc.coords.latitude=array[array.length - 1].latitude;
    currLoc.coords.longitude=array[array.length - 1].longitude;
    currLoc.coords.timestamp = currLoc.timestamp;
    return currLoc;
  }