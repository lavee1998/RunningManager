
import calculateAvg from "./calculateAvg";

describe('speed calculator test:', () => {
    it('1 km / 1 hour ', () => {
        const hourInMs=3600000;
        const speed=calculateAvg(1,hourInMs);
        expect(speed).toBe(1);
    });
    it('10 km / 1 hour ', () => {
        const hourInMs=3600000;
        const speed=calculateAvg(10,hourInMs);
        expect(speed).toBe(10);
    });
    it('1 km / 0.1 hour ', () => {
        const hourInMs=360000;
        const speed=calculateAvg(1,hourInMs);
        expect(speed).toBe(10);
    });
});