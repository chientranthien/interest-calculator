angular.module("Interest", ['ui.router']);

angular.module("Interest").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: "/home",
        templateUrl: "build/ui/home.html"

    });

    $urlRouterProvider.otherwise("/home");
}]);
