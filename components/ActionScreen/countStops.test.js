
import countStops from "./countStops";
describe('count stops test: centimeter correctly', () => {
    it('get 6 decimals in a correct object where all speed is 0', () => {
        const testSpeedArray='[ {"speed":0},{"speed":0},{"speed":0},{"speed":0},{"speed":0},{"speed":0}]';
        const testJSON=JSON.parse(testSpeedArray);
        expect(countStops(testJSON)).toBe(0);
    });
    it('get 6 decimals in a correct object where user stopped once', () => {
        const testSpeedArray2='[ {"speed":0},{"speed":1},{"speed":1},{"speed":0},{"speed":1},{"speed":1}]';
        const testJSON2=JSON.parse(testSpeedArray2);
        expect(countStops(testJSON2)).toBe(1);
    });
    it('get 6 decimals in a correct object where user stopped twice', () => {
        const testSpeedArray3='[ {"speed":0},{"speed":1},{"speed":0},{"speed":1},{"speed":0},{"speed":1}]';
        const testJSON3=JSON.parse(testSpeedArray3);
        expect(countStops(testJSON3)).toBe(2);
    });
});