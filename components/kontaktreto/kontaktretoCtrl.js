app.controller("kontaktretoCtrl", function ($scope, $rootScope, $window, profiloService, kontaktretoService,
                                      errorService, config, auth) {
    $scope.init = function() {
        auth.ensalutita();
        $rootScope.menuo = true;

        config.getConfig("idLaborgrupo").then(function(response) {
          $scope.idLaborgrupo = response.data.idLaborgrupo;
          profiloService.getGrupKat($scope.idLaborgrupo).then(function(response) {
            $scope.laborgrupoj = response.data;
            $scope.laborgrupo = response.data[0];
          }, errorService.error);
        });
    }

    $scope.getAnoj = function() {
      kontaktretoService.getAnoj($scope.laborgrupo.id).then(
        function(response) {
          $scope.anoj = response.data;
        }, errorService.error);
    }

});
