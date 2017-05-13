describe('InterestCalculator', function () {
    var factory;
    beforeEach(module('Interest')); //load module
    describe('simple', function () {
        beforeEach(inject(function (interestCalculator) {
            factory = interestCalculator;
        }));
        it('calculate simple interest', function () {
            expect(factory.calculateSimple(1000, 12, 1)).toBe(1120); 
            expect(factory.calculateSimple(712, 7, 2)).toBeCloseTo(811.68); 
            expect(factory.calculateSimple(913, 3, 2)).toBeCloseTo(967.78); 
            expect(factory.calculateSimple(800, 12, 2)).toBe(992); 
            expect(factory.calculateSimple(800, 12, 5)).toBe(1280); 

        });
    });

    describe('compound', function () {
        beforeEach(inject(function (interestCalculator) {
            factory = interestCalculator;
        }));
        it('calculate compound interest', function () {
            expect(factory.calculateCompound(1000, 3.5, 7,1)).toBeCloseTo(1272.28); //annually
            expect(factory.calculateCompound(1000, 3.5, 7,2)).toBeCloseTo(1274.92); //semi-annually
            expect(factory.calculateCompound(1000, 3.5, 7,4)).toBeCloseTo(1276.26); //Quarterly
            expect(factory.calculateCompound(1000, 3.5, 7,6)).toBeCloseTo(1276.71); //Bi-monthly
            expect(factory.calculateCompound(1000, 3.5, 7,12)).toBeCloseTo(1277.17); //monthly
            expect(factory.calculateCompound(1000000, 3.5, 7,12)).toBeCloseTo(1277165.80); //monthly
            expect(factory.calculateCompound(1000000, 3.5, 1.5,12)).toBeCloseTo(1053822.03); //monthly

        });
    });


});