 app.controller("menuoCtrl", function ($scope, $rootScope, $window, $sanitize,
                                       errorService, config, auth) {

  $scope.init = function() {
    $scope.uzanto = JSON.parse($window.localStorage.getItem('uzanto'));
    $scope.menueroj = [{
      nomo: "<i class='fa fa-address-card'></i> Adresaro",
      klarigo: "Kontaktinformo de delegitoj, estraranoj, kaj aliaj stabanoj de UEA",
      klarigi: false,
      ligilo: "#!/kontaktreto"
    },
    {
      nomo: "<i class='fa fa-book'></i> Teko",
      klarigo: "Elŝutu revuojn kaj aliajn materialojn",
      klarigi: false,
      ligilo: "#!/kontaktreto"
    }];
  }

  $scope.elsaluti = function() {
    auth.elsaluti();
  }

  window.onbeforeunload = function() {
    $window.localStorage.setItem('menuoMembroj', JSON.stringify($scope.menuoMembroj));
    $window.localStorage.setItem('menuoBazaAgordoj', JSON.stringify($scope.menuoBazaAgordoj));
  }

});
