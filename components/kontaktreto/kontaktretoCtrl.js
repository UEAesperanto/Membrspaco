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
                  for (var j = 0; j < response.data.length; j++) {
                    var index = $scope.anoj.findIndex((item) => item.id == response.data[j].id);
                    if (index == -1) {
                      response.data[j].grupoj_obj = [response.data[j]];
                      response.data[j].grupoj = [response.data[j].idGrupo];
                      $scope.anoj.push(response.data[j]);
                    } else {
                      $scope.anoj[index].grupoj_obj.push(response.data[j]);
                      $scope.anoj[index].grupoj.push(response.data[j].idGrupo);
                    }
                  }
                });
            }
            $scope.laborgrupoj = {};
            response.data.map(function(e){$scope.laborgrupoj[e.id] = e})
          }, errorService.error);
        });

        kontaktretoService.getFakoj().then(function(response){
          $scope.fakoj = [];
          response.data.map(function(e){$scope.fakoj[e.id] = e});
        });

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

    $scope.lauxfako = function(ano){
      if((!$scope.fakoSelected) || ($scope.fakoSelected == '')){
        return true;
      }else {
        for(var i = 0; i < ano.grupoj_obj.length; i++) {
          if(ano.grupoj_obj[i].idFaktemo == $scope.fakoSelected) {
            return true;
          }
        }
        return false;
      }
    }

    $scope.filterKategorio = function(ano) {
      if((!$scope.kategorioj) || ($scope.kategorioj == '')){
        return true;
      } else {
        return (ano.grupoj.indexOf($scope.kategorioj) > -1);
      }
    }

    $scope.filterLandoj = function(ano){
      if((!$scope.landoSelect) || ($scope.landoSelect == '')){
        return true;
      } else {
        return (ano.idLando == $scope.landoSelect);
      }
    }

    $scope.montriDetalojn = function(ev, ano) {
      $scope.elektitaAno = ano;

      landojService.getInfoPriLanda($scope.landoj[ano.idLando].landkodo).then(function(response) {
        $scope.landInformoj = response.data;
      }, errorService.error);

      profiloService.elsxutiBildon(ano.id).then(
        function(response) {
          if(response.data == "No file found"){
            $scope.bildo = 'content/img/profilo.png'
          } else {
            $scope.bildo = response.data;
          }
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

     $scope.sercxi = function(ano) {
      if(!$scope.filtrilo)
        return true;
      else {
        var compare = $scope.filtrilo.toLowerCase();
        if((ano.personanomo.toLowerCase().indexOf(compare) > -1) ||
                (ano.familianomo.toLowerCase().indexOf(compare) > -1) ||
                (ano.urbo.toLowerCase().indexOf(compare) > -1)) {
          return true;
        } else {
          return false;
        }
      }
     }

});
