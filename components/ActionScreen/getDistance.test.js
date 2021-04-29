
import getDistance from "./getDistance";
import toFixing from "./toFixing";
describe('get distance test: centimeter correctly', () => {
    it('get 5 decimals correct latitude distance', () => {
        const testdistances='[{"latitude":0, "longitude":0},{"latitude":0.00001, "longitude":0},{"latitude":0.00003, "longitude":0}]';
        const testJSON=JSON.parse(testdistances);
        expect(toFixing(getDistance(testJSON[0],testJSON[2]),5)).toBe(toFixing(getDistance(testJSON[0],testJSON[1])*3,5));
    });
});