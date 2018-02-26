app.controller("loginCtrl", function ($scope, $rootScope, $window, $mdDialog, $sanitize,
                                      errorService, config, loginService) {

  $scope.init = function() {
    $rootScope.menuo = false;
    $scope.msg = "ERARO: Ni ne havas konekton kun la servilo nun";

    // if (($window.localStorage.getItem('token') != null) &&
    //     ($window.localStorage.getItem('token') != 0)){
    //   $window.location.href = '#!/membroj';
    //   $window.location.reload();
    // }

    $scope.url_aligxilo = config.url_aligxilo;
    $scope.msg = "Plenumu kun la informoj, kiujn vi donis dum via aliĝo.";
  }

  $scope.ensaluti = function() {
      loginService.doEnsaluti($scope.uzanto).then(function(response) {
          $window.localStorage.setItem('token', response.data.token);
          $window.localStorage.setItem('uzanto', JSON.stringify(response.data.uzanto));
        //  $window.location.href = '#!/membroj';
          //$window.location.reload();
        }, function(response) {
          $scope.msg = response.data.message;
      });
    }

    $scope.montriDetalojn = function(ev, element) {
      $mdDialog.show({
        contentElement: element,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

    $scope.cancel = function() {
       $mdDialog.cancel();
    };
});
