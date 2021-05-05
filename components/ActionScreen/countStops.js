export default (runCoordinates) => {
    let counter = 0
    let prevValue = -1
    runCoordinates.forEach((coor) => {
        if(prevValue === -1 && coor.speed === 0){
            prevValue = 0
        }
        else if(prevValue > 0 && coor.speed === 0){
            ++counter 
        }
        prevValue = coor.speed
    });
    return(counter)
}