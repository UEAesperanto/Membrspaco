app.controller("tekoCtrl", function ($scope, $rootScope, $window, $sanitize, $mdDialog,
                                      auth, tekoService, errorService, config) {
  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;

    tekoService.getRevuoj().then(function(response) {
      for(var i = 0; i < response.data.length; i++){
        response.data[i].montritaj = 2;
      }
      $scope.revuoj = response.data;
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

   $scope.getKvalita = function(volumo) {
     tekoService.getVolumonKvalita(volumo.id).then(function(response) {
       if(response.data != "No file found"){
         window.location = response.data;
       } else {
         window.alert("La malpeza PDF-a versio de tiu revuo ankoraŭ ne disponeblas");
       }
     });
   }

   $scope.getMalpeza = function(volumo) {
     tekoService.getVolumonMalpeza(volumo.id).then(function(response) {
       if(response.data != "No file found"){
         window.location = response.data;
       } else {
         window.alert("La malpeza PDF-a versio de tiu revuo ankoraŭ ne disponeblas");
       }
     });
   }

   $scope.getMp3 = function(volumo) {
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
     });
   }

});
