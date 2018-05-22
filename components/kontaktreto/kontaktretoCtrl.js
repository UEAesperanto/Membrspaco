app.controller("kontaktretoCtrl", function ($scope, $rootScope, $window, $mdDialog,
                                            profiloService, kontaktretoService, landojService,
                                            errorService, config, auth) {
    $scope.init = function() {
        auth.ensalutita();
        $rootScope.menuo = true;
        $scope.limit = 10;
        $scope.afiltriloj = false;

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
                }, errorService.errorMembro);
              $scope.montreblajAnoj = $scope.anoj;
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

     $scope.aldoni20 = function(){
       $scope.limit += 20;
     }

     $scope.escape = function(string) {
        try {
          return decodeURIComponent(escape(string));
        } catch(error) {
          return string;
        }
     }

     $scope.filtri = function() {
       var lauxfako = function(ano){
         for(var i = 0; i < ano.grupoj_obj.length; i++) {
           if(ano.grupoj_obj[i].idFaktemo == $scope.fakoSelected) {
             return true;
           }
         }
         return false;
       }

       var filterKategorio = function(ano) {
          return (ano.grupoj.indexOf($scope.kategorioj) > -1);
       }

       var filterLandoj = function(ano){
         return (ano.idLando == $scope.landoSelect);
       }


       var sercxi = function(element) {
         element.tutaNomo = element.personanomo + element.familianomo;
         try {
           var string =
           decodeURIComponent(escape(element.tutaNomo)).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
         } catch(error) {
           var string = element.tutaNomo.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
         }

         var filter = $scope.filtrilo.split(" ");
         var isTrue = true;
         for (var i = 0; i < filter.length; i++) {
            var f = filter[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            if(string.indexOf(f) > -1){
              isTrue = isTrue && true;
            } else {
              isTrue = false;
            }
          }
          if(isTrue){
            return isTrue;
          } else {
            var f = $scope.filtrilo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            string = Object.values(element).toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            if(string.indexOf(f) > -1){
              return true;
            } else {
              return false;
            }
          }
       }

       $scope.montreblajAnoj = $scope.anoj;

       if(($scope.filtrilo) && ($scope.filtrilo != '')) {
         $scope.montreblajAnoj = $scope.montreblajAnoj.filter(sercxi);
       }
       if(($scope.landoSelect) && ($scope.landoSelect != "")){
         $scope.montreblajAnoj = $scope.montreblajAnoj.filter(filterLandoj);
       }
       if(($scope.fakoSelected) && ($scope.fakoSelected != "")){
         $scope.montreblajAnoj = $scope.montreblajAnoj.filter(lauxfako);
       }
       if(($scope.kategorioj) && ($scope.kategorioj != "")){
         $scope.montreblajAnoj = $scope.montreblajAnoj.filter(filterKategorio);
       }
    }

    $scope.sercxiFako = function(idFaktemo) {
      $scope.fakoSelected = idFaktemo;
      $scope.filtri();
    }

    $scope.sercxiLando = function(idLando) {
      $scope.landoSelect = idLando;
      $scope.filtri();
    }

    $scope.sercxiLaborgrupo = function(idLaborgrupo) {
      $scope.kategorioj = idLaborgrupo;
      $scope.filtri();
    }

    $scope.forigiQuery = function() {
      $scope.filtrilo = null;
      $scope.filtri();
    }

    $scope.forigiFako = function() {
      $scope.fakoSelected = null;
      $scope.filtri();
    }

    $scope.forigiLando = function() {
      $scope.landoSelect = null;
      $scope.filtri();
    }

    $scope.forigiKategorio = function() {
      $scope.kategorioj = null;
      $scope.filtri();
    }
});
