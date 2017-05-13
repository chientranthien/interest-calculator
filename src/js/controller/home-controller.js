angular.module("Interest").controller("HomeController", ['$scope', function ($scope) {

    var vm = this;
    vm.data = {};

    vm.timeType = "Years";

    vm.frequencyTypes = [
        {name: "Annually", value: 1},
        {name: "Semi-Annually", value: 2},
        {name: "Quarterly", value: 4},
        {name: "Bi-Monthly", value: 6},
        {name: "Monthly", value: 12},
        {name: "Semi-Monthly", value: 24},
        {name: "Bi-Weekly", value: 26},
        {name: "Weekly", value: 52},
        {name: "Daily", value: 365},
    ]
    vm.frequency = vm.frequencyTypes[0];

    vm.calculate = function () {
        if (vm.isCompound)
            return calculateCompound();
        return calculateSimple();
    }
    function calculateSimple() {
        //A = P(1 + rt)
        var timeInYear = vm.timeType === "Years" ? vm.time : vm.time / 12;
        return vm.principle * (1.0 + vm.rate * timeInYear / 100.0);
    }

    function calculateCompound() {

        //A = P(1 + r/n)^nt
        var rateInDecimal = vm.rate / 100;
        var timeInYear = vm.timeType === "Years" ? vm.time : vm.time / 12;
        var a = (1 + rateInDecimal / vm.frequency.value);
        var b = vm.frequency.value * timeInYear;

        return vm.principle * Math.pow(a, b);
    }

    vm.validate = function () {
        if (isNaN(vm.time) || isNaN(vm.rate) || isNaN(vm.principle))
            return false;
        return true;
    }


}]);