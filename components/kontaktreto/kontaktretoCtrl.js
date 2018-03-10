app.controller("kontaktretoCtrl", function ($scope, $rootScope, $window, $mdDialog,
                                            profiloService, kontaktretoService, landojService,
                                            errorService, config, auth) {

   $scope.getAnoj = function() {
      kontaktretoService.getAnoj($scope.laborgrupo.id).then(
        function(response) {
          $scope.anoj = response.data;
        }, errorService.error);
    }

    $scope.init = function() {
        auth.ensalutita();
        $rootScope.menuo = true;

        config.getConfig("idLaborgrupo").then(function(response) {
          $scope.idLaborgrupo = response.data.idLaborgrupo;
          profiloService.getGrupKat($scope.idLaborgrupo).then(function(response) {
            $scope.laborgrupoj = response.data;
            $scope.laborgrupo = response.data[0];
            $scope.getAnoj();
          }, errorService.error);
        });
    }

    $scope.montriDetalojn = function(ev, ano) {
      $scope.elektitaAno = ano;

      landojService.getInfoPriLanda(ano.landkodo).then(function(response) {
        $scope.landInformoj = response.data;
      }, errorService.error);

      profiloService.elsxutiBildon(ano.idAno).then(
        function(response) {
          $scope.bildo = response.data;
        },
        function(err) {
          $scope.bildo = 'content/img/profilo.png'
      });

      $mdDialog.show({
        contentElement: '#detaloj',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

    $scope.cancel = function() {
       $mdDialog.cancel();
     };

    $scope.ligiAno = function(ano) {
      ano.nomo = ano.personanomo + " " + ano.familianomo.toUpperCase();
      ano.lando = ano.radikoEo + ano.finajxoEo;
      return ano;
    }

});
