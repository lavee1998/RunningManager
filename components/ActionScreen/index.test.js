
import updateLocation from "./updateLocation";
describe('update location test:', () => {
    it('arr test', () => {
        let arr=[];
        expect(arr.length).toBe(0);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":200}'),0);

        expect(arr.length).toBe(0);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":300}'),0);

        expect(arr.length).toBe(0);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":400}'),0);

        expect(arr.length).toBe(0);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":500}'),0);
        
        
        expect(arr.length).toBe(1);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":1000}'),0);
    
        expect(arr.length).toBe(2);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":1500}'),0);
        
        expect(arr.length).toBe(3);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":3000}'),0);
        
        expect(arr.length).toBe(4);
    });
    it('lastTm test', () => {
        let testPhase=1;
        let lastTm=0;
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":200}'),testPhase,true);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":300}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":400}'),testPhase);
        lastTm=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":500}'),testPhase);
        
        expect(lastTm).toBe(0);
        lastTm=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":1000}'),testPhase);
    
        
        expect(lastTm).toBe(500);
        lastTm=updateLocation(JSON.parse('{"coords":{"latitude":100.00005, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":10000}'),testPhase);
        
        expect(lastTm).toBe(0);
        lastTm=updateLocation(JSON.parse('{"coords":{"latitude":100.00005, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":11000}'),testPhase);
        expect(lastTm).toBe(10000);
    });
    it('distance test', () => {

        let testPhase=2;
        let distance=0;
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":200}'),testPhase,true);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":300}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":400}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100.00005, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":5000}'),testPhase);
        step=updateLocation(JSON.parse('{"coords":{"latitude":100.0001, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":10000}'),testPhase);
    
        distance=updateLocation(JSON.parse('{"coords":{"latitude":100.00015, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":15000}'),testPhase);
    
        
        expect(distance).toBe(step*2);
        distance=updateLocation(JSON.parse('{"coords":{"latitude":100.0002, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":20000}'),testPhase);
        
        expect(distance).toBe(step*3);
    });
    it('first data drop test', () => {
        let testPhase=3;
        let first=
            updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":200}'),testPhase,true);
        expect(first).toBe(2);
        first=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":300}'),testPhase);
        expect(first).toBe(1);
        first=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":400}'),testPhase);
        expect(first).toBe(0);
        first=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":500}'),testPhase);
        expect(first).toBe(0);
    });
   
    
    it('tooSlow test', () => {
        let testPhase=4;

        let tooSlow=
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":200}'),testPhase,true);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":300}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":400}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":500}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":1000}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":10000}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":200}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":300}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":400}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":500}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":1000}'),testPhase);
        updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":10000}'),testPhase);
        
        tooSlow=updateLocation(JSON.parse('{"coords":{"latitude":100.00005, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":11000}'),testPhase);
        expect(tooSlow).toBe(true);
    });
    it('runCoordintes test', () => {
        let testPhase=5;
        let arr=[];
        expect(arr.length).toBe(0);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":200}'),testPhase,true);

        expect(arr.length).toBe(0);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":300}'),testPhase);

        expect(arr.length).toBe(0);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":400}'),testPhase);

        expect(arr.length).toBe(0);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":500}'),testPhase);
        
        
        expect(arr.length).toBe(1);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":1000}'),testPhase);
    
        expect(arr.length).toBe(2);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":1500}'),testPhase);
        
        expect(arr.length).toBe(3);
        arr=updateLocation(JSON.parse('{"coords":{"latitude":100, "longitude":100,"altitude":100,"accuracy":100,"altitudeAccuracy":100,"heading":100},"timestamp":3000}'),testPhase);
        
        expect(arr.length).toBe(4);
    });
   

});