
import getDistance from "./getDistance";
import toFixing from "./toFixing";
import getDistanceOfLastElements from "./getDistanceOfLastElements";
describe('get distance test: centimeter correctly', () => {
    const testdistances='[{"latitude":0, "longitude":0},{"latitude":0.00001, "longitude":0},{"latitude":0.00002, "longitude":0},{"latitude":0.00003, "longitude":0},{"latitude":0.00004, "longitude":0},{"latitude":0.00005, "longitude":0},{"latitude":0.00006, "longitude":0}]';
    const testJSON=JSON.parse(testdistances);
    it('check distance of last 2 elements distance in array', () => {
        expect(toFixing(getDistanceOfLastElements(testJSON,2),5)).toBe(toFixing(getDistance(testJSON[5],testJSON[6]),5));
    });
    it('check distance of last 3 elements in array', () => {
        expect(toFixing(getDistanceOfLastElements(testJSON,3),5)).toBe(toFixing(getDistance(testJSON[4],testJSON[6]),5));
    });
    it('check distance of last 4 elements in array', () => {
        expect(toFixing(getDistanceOfLastElements(testJSON,4),5)).toBe(toFixing(getDistance(testJSON[3],testJSON[6]),5));
    });
    it('check distance of last 5 elements in array', () => {
        expect(toFixing(getDistanceOfLastElements(testJSON,5),5)).toBe(toFixing(getDistance(testJSON[2],testJSON[6]),5));
    });
    it('check distance of  last 6 elements in array', () => {
        expect(toFixing(getDistanceOfLastElements(testJSON,6),5)).toBe(toFixing(getDistance(testJSON[1],testJSON[6]),5));
    });
    it('check distance of last 7 elements in array', () => {
        expect(toFixing(getDistanceOfLastElements(testJSON,7),5)).toBe(toFixing(getDistance(testJSON[0],testJSON[6]),5));
    });
});