
import getHHMMSS from "./getHHMMSS";
describe('formating to HHMMSS test:', () => {
    it('1 sec long time equal 00:00:01 ', () => {
        const timeInMs=1000;
        const timeInHHMMSS=getHHMMSS(timeInMs);
        expect(timeInHHMMSS).toBe("00:00:01");
    });
    it('10 sec long time equal 00:00:10 ', () => {
        const timeInMs=10000;
        const timeInHHMMSS=getHHMMSS(timeInMs);
        expect(timeInHHMMSS).toBe("00:00:10");
    });
    it('1 min long time equal 00:01:00 ', () => {
        const timeInMs=60000;
        const timeInHHMMSS=getHHMMSS(timeInMs);
        expect(timeInHHMMSS).toBe("00:01:00");
    });
    it('10 min long time equal 00:10:00 ', () => {
        const timeInMs=600000;
        const timeInHHMMSS=getHHMMSS(timeInMs);
        expect(timeInHHMMSS).toBe("00:10:00");
    });
    it('1 hour long time equal 01:00:00 ', () => {
        const timeInMs=3600000;
        const timeInHHMMSS=getHHMMSS(timeInMs);
        expect(timeInHHMMSS).toBe("01:00:00");
    });
    it('10 hour long time equal 10:00:00 ', () => {
        const timeInMs=36000000;
        const timeInHHMMSS=getHHMMSS(timeInMs);
        expect(timeInHHMMSS).toBe("10:00:00");
    });
    it('24 hour long time equal 00:00:00 ', () => {
        const timeInMs=86400000;
        const timeInHHMMSS=getHHMMSS(timeInMs);
        expect(timeInHHMMSS).toBe("00:00:00");
    });
});