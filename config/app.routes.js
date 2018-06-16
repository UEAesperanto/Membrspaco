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
      templateUrl: "components/asocioj/asocioj.htm",
      controller: "asociojCtrl"
    })
    .when("/teko", {
      templateUrl: "components/teko/teko.htm",
      controller: "tekoCtrl"
    })
    .when("/retlistoj", {
      templateUrl: "components/retlistoj/retlistoj.htm",
      controller: "retlistojCtrl"
    })
    .when("/404", {
      templateUrl: "components/404.htm",
      controller: "profiloCtrl"
    })
    .otherwise({redirectTo:'/404'});
});
