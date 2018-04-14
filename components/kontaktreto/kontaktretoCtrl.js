app.controller("kontaktretoCtrl", function ($scope, $rootScope, $window, $mdDialog,
                                            profiloService, kontaktretoService, landojService,
                                            errorService, config, auth) {
    $scope.init = function() {
        auth.ensalutita();
        $rootScope.menuo = true;

        config.getConfig("idLaborgrupo").then(function(response) {
          $scope.idLaborgrupo = response.data.idLaborgrupo;
          profiloService.getGrupKat($scope.idLaborgrupo).then(function(response) {
          var laborgrupoj = response.data;
          $scope.anoj = [];
            for (var i = 0; i < laborgrupoj.length; i++) {
              kontaktretoService.getAnoj(laborgrupoj[i].id).then(
                function(response) {
                  $scope.anoj.push.apply($scope.anoj, response.data);
                }, errorService.error);
            }
            $scope.laborgrupoj = {};
            response.data.map(function(e){$scope.laborgrupoj[e.id] = e})
          }, errorService.error);
        });
        console.log($scope.anoj);

        landojService.getLandoj().then(function(response){
          $scope.landoj = [];
          response.data.map(function(e){$scope.landoj[e.id] = e});
        });
    }

    $scope.getImg = function(id) {
      profiloService.elsxutiBildon(id).then(
        function(response) {
          return response.data;
        },
        function(err) {
          return 'content/img/profilo.png'
      });
    }

    $scope.montriDetalojn = function(ev, ano) {
      $scope.elektitaAno = ano;

      landojService.getInfoPriLanda($scope.landoj[ano.idLando].landkodo).then(function(response) {
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
