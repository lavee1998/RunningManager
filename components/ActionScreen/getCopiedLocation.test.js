

import getCopiedLocation from "./getCopiedLocation";
describe('rewrite test:', () => {
    const testArray='[{"latitude":0, "longitude":0,"altitude":1,"accuracy":12,"altitudeAccuracy":21,"heading":10,"timestamp":1000}]';
    const testCurrentLocation='{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":2000}'
    const testJSON=JSON.parse(testArray);
    const testCurrentJSON=JSON.parse(testCurrentLocation);
    it('latitude copy test', () => {
         expect(getCopiedLocation(testJSON,testCurrentJSON).coords.latitude).toBe(0);
    });
    it('longitude copy test', () => {
        expect(getCopiedLocation(testJSON,testCurrentJSON).coords.longitude).toBe(0);
    });
    it('altitude copy test', () => {
        expect(getCopiedLocation(testJSON,testCurrentJSON).coords.altitude).toBe(1);
    });
    it('accuracy copy test', () => {
        expect(getCopiedLocation(testJSON,testCurrentJSON).coords.accuracy).toBe(12);
    });
    it('altitudeAccuracy copy test', () => {
        expect(getCopiedLocation(testJSON,testCurrentJSON).coords.altitudeAccuracy).toBe(21);
    });
    it('heading copy test', () => {
        expect(getCopiedLocation(testJSON,testCurrentJSON).coords.heading).toBe(10);
    });
    it('timestamp not copy test', () => {
        expect(getCopiedLocation(testJSON,testCurrentJSON).coords.timestamp).toBe(2000);
    });

});