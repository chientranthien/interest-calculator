angular.module("Interest").factory("interestCalculator", [function () {
    var factory = {};
    /**
     * A = P(1 + rt). r is rate in decimal
     * @param principle
     * @param rate in percentage
     * @param timeInYear
     * @returns {number}
     */
    factory.calculateSimple = function (principle, rate, timeInYear) {
        return principle * (1.0 + rate * timeInYear / 100.0);
    }

    /**
     * A = P(1 + r/n)^nt
     * @param principle
     * @param rate in percentage
     * @param timeInYear
     * @param frequency. Based on frequency type such as Annually, Semi-Annually, Quarterly.
     * @returns the total of principle and interest
     */
    factory.calculateCompound = function (principle, rate, timeInYear, frequency) {

        var rateInDecimal = rate / 100;
        var a = (1 + rateInDecimal / frequency);
        var b = frequency * timeInYear;

        return principle * Math.pow(a, b);
    }
    return factory;
}]);

