app.controller("profiloCtrl", function ($scope, $rootScope, $window, $mdDialog,
                                        $sanitize,
                                        auth, profiloService, errorService,
                                        landojService) {
  $scope.init = function() {
    auth.ensalutita();
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

    profiloService.elsxutiBildon($scope.unuaUzanto.id).then(
      function(response) {
        $scope.bildo = response.data;
      },
      function(err) {
        $scope.bildo = 'content/img/profilo.png'
     });

     profiloService.getGrupoj($scope.unuaUzanto.id).then(function(response) {
       $scope.grupoj = response.data;
       for (var i = 0; i < $scope.grupoj.length; i++) {
         $scope.grupoj[i].komencdato = $scope.grupoj[i].komencdato.slice(0,10);
         if($scope.grupoj[i].findato)
             $scope.grupoj[i].findato = $scope.grupoj[i].findato.slice(0,10);
       }
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
    if(kampo == 'retposxto') {
      var data2 = {valoro: valoro, kampo: "uzantnomo"};
      profiloService.updateUzanto($scope.unuaUzanto.id, data2).then(
        function(sucess){
          $window.location.reload();
        }, errorService.error);
    }
    profiloService.updateUzanto($scope.unuaUzanto.id, data).then(
      function(sucess){
        $window.location.reload();
      }, errorService.error);
  }

});
