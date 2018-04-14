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
    .when("/kontaktreto", {
      templateUrl: "components/kontaktreto/kontaktreto.htm",
      controller: "kontaktretoCtrl"
    })
    .when("/profilo", {
      templateUrl: "components/profilo/profilo.htm",
      controller: "profiloCtrl"
    })
    .when("/asocioj", {
      templateUrl: "components/asocioj.htm",
      controller: "profiloCtrl"
    })
    .when("/404", {
      templateUrl: "components/404.htm",
      controller: "profiloCtrl"
    })
    .otherwise({redirectTo:'/404'});
});
