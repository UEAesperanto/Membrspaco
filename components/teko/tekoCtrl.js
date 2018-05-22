app.controller("tekoCtrl", function ($scope, $rootScope, $window, $sanitize, $mdDialog,
                                      auth, tekoService, errorService, profiloService,
                                      config) {
  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;

    tekoService.getRevuoj().then(function(response) {
      for(var i = 0; i < response.data.length; i++){
        response.data[i].montritaj = 2;
      }
      $scope.revuoj = response.data;
    }, errorService.error);

    $scope.unuaUzanto = JSON.parse($window.localStorage.getItem('uzanto'));

    profiloService.getUzanto($scope.unuaUzanto.id).then(function(response){
      $scope.uzanto = response.data[0];
      $scope.uzanto.naskigxjaro = new Date($scope.uzanto.naskigxtago.slice(0,10)).getFullYear();
    }, errorService.error);

    config.getConfig('junaAgxo').then(function(response){
      $scope.agxo = response.data.junaAgxo;
    }, errorService.error);
  }

  $scope.aldoni5 = function(revuo){
    revuo.montritaj += 5;
  }

  $scope.getVolumoj = function (revuo) {
    tekoService.getVolumoj(revuo.id).then(function(response) {
      var vol = response.data;
      for(var i = 0; i < vol.length; i++){
        vol[i].jaro = new Date(vol[i].eldondato).getFullYear();
      }
      if(vol.length >= 1) {
        tekoService.getVolumonKovrilbildo(vol[vol.length - 1].id).then(function(response){
           vol[vol.length - 1].bildo = response.data;
           revuo.volumoj = vol;
        }, function(err) {
           vol[vol.length - 1].bildo = '';
           revuo.volumoj = vol;
        });
      } else {
        revuo.volumoj = vol;
      }
    });
  }

  $scope.cxuJuna = function(titolo){
    if(titolo.toLowerCase().indexOf("kontakto") > -1) {
      var jaro = new Date().getFullYear();
      if(jaro - $scope.uzanto.naskigxjaro > $scope.agxo) {
        return false
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  $scope.montriDetalojn = function(ev, volumo) {
    $scope.elektitaVol = volumo;

    tekoService.getVolumonKovrilbildo(volumo.id).then(
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

    document.getElementById('enhavlisto').innerHTML = volumo.enhavlisto;

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

   $scope.getKvalita = function(volumo, titolo) {
     if(!$scope.cxuJuna(titolo)) {
       window.alert("Vi ne rajtas elŝuti tiun revuon ĉar vi ne estas membro de TEJO");
       return;
     }
     tekoService.getVolumonKvalita(volumo.id).then(function(response) {
       if(response.data != "No file found"){
         window.location = response.data;
       } else {
         window.alert("La kvalita PDF-a versio de tiu revuo ankoraŭ ne disponeblas");
       }
     }, errorService.errorMembro);
   }

   $scope.getMalpeza = function(volumo, titolo) {
     if(!$scope.cxuJuna(titolo)){
       window.alert("Vi ne rajtas elŝuti tiun revuon ĉar vi ne estas membro de TEJO");
       return;
     }
     tekoService.getVolumonMalpeza(volumo.id).then(function(response) {
       if(response.data != "No file found"){
         window.location = response.data;
       } else {
         window.alert("La malpeza PDF-a versio de tiu revuo ankoraŭ ne disponeblas");
       }
     }, errorService.errorMembro);
   }

   $scope.getMp3 = function(volumo, titolo) {
     if(!$scope.cxuJuna(titolo)){
       window.alert("Vi ne rajtas elŝuti tiun revuon ĉar vi ne estas membro de TEJO");
       return;
     }
     tekoService.getMp3(volumo.id).then(function(response) {
       if(response.data != "No file found"){
         var link = document.createElement('a');
         fetch(response.data).then(function(res) {
           res.blob().then(function(res){
             link.href = window.URL.createObjectURL(res);
             link.download = volumo.id.toString() + '.mp3';
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
           });
         });
       } else {
         window.alert("La sona versio de tiu volumo ankoraŭ ne disponeblas");
       }
     }, errorService.errorMembro);
   }

});
