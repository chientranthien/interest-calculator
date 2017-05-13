angular.module("Appointment", ['ui.router']);

angular.module("Appointment").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: "/home",
        templateUrl: "build/ui/home.html"

    });

    $urlRouterProvider.otherwise("/home");
}]);
