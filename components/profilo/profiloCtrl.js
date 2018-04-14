app.controller("profiloCtrl", function ($scope, $rootScope, $window, $sanitize,
                                        auth, profiloService, errorService,
                                        landojService, config) {
  $scope.init = function() {
    //auth.ensalutita();
    $rootScope.menuo = true;
    $scope.unuaUzanto = JSON.parse($window.localStorage.getItem('uzanto'));

    profiloService.getUzanto($scope.unuaUzanto.id).then(function(response){
      $scope.uzanto = response.data[0];
      $scope.uzanto.naskigxtago = $scope.uzanto.naskigxtago.slice(0,10);

      landojService.getLandoj($scope.uzanto.idLando).then(function(response){
        $scope.lando = response.data[0];
        landojService.getInfoPriLanda(response.data[0].landkodo).then(function(response) {
          $scope.landInformoj = response.data;
        }, errorService.error);
      }, errorService.error);
    }, errorService.error);

    $scope.titoloj = ["S-ro", "S-rino", "D-ro",
                      "D-rino", "Profesoro", "Profesorino",
                      "Magistro", "Magistrino", "Pastro", "Pastrino", "Alia"];

    profiloService.elsxutiBildon($scope.unuaUzanto.id).then(
      function(response) {
        $scope.bildo = response.data;
      },
      function(err) {
        $scope.bildo = 'content/img/profilo.png'
     });

     profiloService.getGrupoj($scope.unuaUzanto.id).then(function(response) {
       $scope.grupoj = {};
       response.data.map(function (elem) {
         elem.komencdato = elem.komencdato.slice(0,10);
         if (elem.findato) {
           elem.findato = elem.findato.slice(0,10);
         }
         if (!$scope.grupoj[elem.id]) {
           if(elem.idFaktemo) {
             elem.faktemoj = [];
             elem.faktemoj.push(elem.idFaktemo);
           }
           $scope.grupoj[elem.id] = elem;
          } else {
            if(elem.idFaktemo) {
              $scope.grupoj[elem.id].faktemoj.push(elem.idFaktemo);
            }
           }
         });
     }, errorService.error);

       config.getConfig("idMembrecgrupo").then(function(response) {
         $scope.idMembrecgrupo = response.data.idMembrecgrupo;
         profiloService.getGrupKat($scope.idMembrecgrupo).then(function(response){
           var membrArr = response.data.map(function(elem) {return elem.id})
           $scope.membrecgrupo  = {};
           Object.keys($scope.grupoj).forEach(function(key,index) {
             if(membrArr.indexOf($scope.grupoj[key].idGrupo) > -1) {
               if (($scope.grupoj[key].findato == null) || (new Date($scope.grupoj[key].findato) > new Date())) {
                 $scope.membrecgrupo = $scope.grupoj[key];
               }
             }
           });
           if($scope.membrecgrupo) {
             if($scope.membrecgrupo.findato == null) {
               $scope.gxis = "Dumviva membro";
             } else {
               var finjaro = parseInt($scope.membrecgrupo.findato.slice(0, 4)) - 1;
               $scope.gxis = "Membro ĝis " +  finjaro;
             }
           }
          }, errorService.error);
        }, errorService.error);
  }

  $scope.upload = function() {
    profiloService.alsxultiBildon($scope.unuaUzanto.id, $scope.file).then(function(response) {
      $window.location.reload();
    }, errorService.error, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    });
  };

  $scope.updateUzanto = function(valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
    profiloService.updateUzanto($scope.unuaUzanto.id, data).then(
      function(sucess){
        $window.location.reload();
    }, errorService.error);
  }

  $scope.encodeJson = function(data) {
    return JSON.stringify(data);
  }

});
