
import getDistance from "./getDistance";
  export default (array,countOfElements)=>{
    let currD = 0;
    for (let i = 1; i < countOfElements; i++) {
      currD =
        parseFloat(currD) +
        getDistance(array[array.length - i], array[array.length - i - 1]);
    }
    return currD;
  }