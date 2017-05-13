angular.module("Interest").controller("HomeController", ['interestCalculator', function (calculator) {

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
        var timeInYear = vm.timeType === "Years" ? vm.time : vm.time / 12;

        if (vm.isCompound)
            return calculator.calculateCompound(vm.principle, vm.rate, timeInYear, vm.frequency.value);
        return calculator.calculateSimple(vm.principle, vm.rate, timeInYear);
    }


    vm.validate = function () {
        if (isNaN(vm.time) || isNaN(vm.rate) || isNaN(vm.principle))
            return false;
        return true;
    }


}]);