 app.controller("menuoCtrl", function ($scope, $rootScope, $window,
                                       errorService, config, auth) {

  $scope.init = function() {
    $scope.uzanto = JSON.parse($window.localStorage.getItem('uzanto'));
    $scope.menueroj = [{
      nomo: "Funkcio",
      ligilo: "x"
    }];

  }

  $scope.elsaluti = function() {
    auth.elsaluti();
  }

  window.onbeforeunload = function() {
    $window.localStorage.setItem('menuoMembroj', JSON.stringify($scope.menuoMembroj));
    $window.localStorage.setItem('menuoBazaAgordoj', JSON.stringify($scope.menuoBazaAgordoj));
  }

});
