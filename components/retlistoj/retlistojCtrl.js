app.controller("retlistojCtrl", function ($scope, $rootScope, $window, $sanitize, retlistojService,
    profiloService, errorService, config, auth) {

    $scope.init = function(){
        $rootScope.menuo = true;
        auth.ensalutita();

        $scope.unuaUzanto = JSON.parse($window.localStorage.getItem('uzanto'));

        profiloService.getUzanto($scope.unuaUzanto.id).then(function(response){
            $scope.uzanto = response.data[0];
            if((!$scope.uzanto.retposxto) || ($scope.uzanto.retposxto == '')) {
                window.alert("UEA ne konas vian retpoŝtadreson. Aldonu ĝin je via profila paĝo");
                $window.location.href = '#!/profilo';
                $widow.location.reload();
            }
            retlistojService.getRetlistoj().then(function(response){
                $scope.retlistoj = response.data;
            }, errorService.error);
        }, errorService.error);
    }

    $scope.cxuAbonanto = function(retlisto) {
        retlistojService.getAbonanto(retlisto.id, $scope.uzanto.retposxto).then(function(response){
            if(response.data.length == 0) {
                retlisto.abonanto = false;
            } else {
                retlisto.abonanto = true;
                retlisto.idAbonanto = response.data[0].id;
            }
        }, errorService.error);
    }

    $scope.abonado = function(retlisto) {
        // window.alert("abonas");
        if(retlisto.abonanto){
            retlistojService.postAbonanto(retlisto.id, $scope.uzanto.retposxto).then(function(response){}, function(error){
                $window.location.reload();
            });
        } else {
            retlistojService.removeAbonanto(retlisto.id, retlisto.idAbonanto).then(function(response){}, function(error){
                console.log(error);
            });
        }
    }

});
