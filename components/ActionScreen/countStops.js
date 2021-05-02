export default (runCoordinates) => {
    let counter = 0
    let prevValue = null
    runCoordinates.forEach(coor => {
        if(prevValue === null && coor.speed === 0){
            prevValue = 0
        }
        else if(prevValue > 0 && coor.speed === 0){
            ++counter 
        }
        prevValue = coor.speed

    });
    return(counter)
}