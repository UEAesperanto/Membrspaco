angular.module('membrspaco').config(function($routeProvider){
    $routeProvider
    .when("/login", {
      templateUrl: "components/login/login.htm",
      controller: "loginCtrl"
    })
    .when("/", {
      templateUrl: "components/login/login.htm",
      controller: "loginCtrl"
    })
    .when("/profilo", {
      templateUrl: "components/profilo/profilo.htm",
      controller: "profiloCtrl"
    });
});
