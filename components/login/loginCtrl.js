app.controller("loginCtrl", function ($scope, $scope, $window, $routeParams,
                                      $location, $mdDialog, $sanitize,
                                      errorService, config, loginService) {

  $scope.init = function() {
    $scope.menuo = false;

    if($routeParams.message) {
      window.alert($routeParams.message);
    }

    if (($window.localStorage.getItem('tokenUzanto') != null) &&
        ($window.localStorage.getItem('tokenUzanto') != 0)){
      $window.location.href = '#!/profilo';
      $window.location.reload();
    }

    if($routeParams.token) {
      $window.localStorage.setItem('tokenUzanto', $routeParams.token);
      $window.localStorage.setItem('uzanto', JSON.stringify({'id': $routeParams.id}));
      $window.location.href = '#!/profilo';
      $window.location.reload();
    }
    var url = $location.$$absUrl.split("#!/");
    var url = url[0].split("/?");
    if((url.length == 2) && (url[1].indexOf("code") > -1)) {
      loginService.senpasvorto(url[1]).then(function(response) {
        console.log(response);
      }, function(response) {
        window.alert("Ne korekta ligilo");
      });
    }

    if (($window.localStorage.getItem('tokenUzanto') != null) &&
        ($window.localStorage.getItem('tokenUzanto') != 0)){
      $window.location.href = '#!/profilo';
      $window.location.reload();
    }

    $scope.url_aligxilo = config.url_aligxilo;
  }

  $scope.ensaluti = function() {
      loginService.doEnsaluti($scope.uzanto).then(function(response) {
          $window.localStorage.setItem('tokenUzanto', response.data.token);
          $window.localStorage.setItem('uzanto', JSON.stringify(response.data.uzanto));
          $window.location.href = '#!/profilo';
          $window.location.reload();
        }, function(response) {
          $scope.msg = response.data.message;
      });
  }

  $scope.forgesisPas = function() {
    var nt = $scope.uzanto.naskigxtagoSenFormo
    $scope.uzanto.naskigxtago = (nt[4] + nt[5] + nt[6] + nt[7] + "-" +
                                     nt[2] + nt[3] + "-" + nt[0] + nt[1]).toString();
    var timestamp = Date.parse($scope.uzanto.naskigxtago);
    var minDate = new Date("1877-06-26");
    var maxDate = new Date();
    var naskigxtago = new Date($scope.uzanto.naskigxtago);
    if(isNaN(timestamp)) {
       $scope.forgesis.naskigxitago.$setValidity("date", false);
    } else {
      if((naskigxtago < minDate) || (naskigxtago > maxDate)){
         $scope.forgesis.naskigxitago.$setValidity("date", false);
      } else {
         $scope.forgesis.naskigxitago.$setValidity("date", true);
      }
    }

    if($scope.forgesis.$valid) {
      loginService.forgesis($scope.uzanto).then(function(response){
        window.alert("Nova pasvorto sendita al via retpoŝto");
        $window.location.reload();
      }, function (response) {
        $scope.err = response.data.message;
        console.log(response);
      });
    }
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
