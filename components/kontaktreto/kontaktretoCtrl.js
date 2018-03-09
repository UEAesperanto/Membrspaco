app.controller("kontaktretoCtrl", function ($scope, $rootScope, $window,
                                      errorService, config, auth) {
    $scope.init = function() {
        auth.ensalutita();
        $rootScope.menuo = true;
    }

});
