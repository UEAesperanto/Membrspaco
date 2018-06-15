 app.controller("menuoCtrl", function ($scope, $rootScope, $window, $sanitize,
                                       errorService, config, auth) {

  $scope.init = function() {
    $scope.uzanto = JSON.parse($window.localStorage.getItem('uzanto'));
    if($scope.uzanto.permesoj.indexOf('membro') > -1) {
      $scope.membro = true;
    }

    $scope.url_aligxilo = config.url_aligxilo;

    $scope.menueroj = [{
      nomo: "<i class='fa fa-address-card'></i> Adresaro",
      klarigo: "Kontaktinformo de delegitoj, estraranoj, kaj aliaj stabanoj de UEA",
      ligilo: "#!/kontaktreto"
    },
    {
      nomo: "<i class='fa fa-book'></i> Teko",
      klarigo: "Elŝutu revuojn kaj aliajn materialojn",
      klarigi: false,
      ligilo: "#!/teko"
    },
    {
      nomo: "<i class='fa fa-globe'></i> Lokaj Asocioj kaj Grupoj",
      klarigo: "Trovu lokajn asociojn kaj grupojn ligitajn al UEA",
      ligilo: "#!/asocioj"
    },
    {
      nomo: "<i class='fa fa-envelope'></i> Retlistoj",
      klarigo: "Agordu viajn retlistajn preferojn",
      ligilo: "#!/retlistoj"
    }];

    $scope.url_aligxilo = config.url_aligxilo;
  }

  $scope.elsaluti = function() {
    auth.elsaluti();
  }

  $scope.cxuFermi = function() {
     var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
     if(width < 700) {
       document.getElementById("mySidenav").style.width = "0";
     }
  }

  window.onbeforeunload = function() {
    $window.localStorage.setItem('menuoMembroj', JSON.stringify($scope.menuoMembroj));
    $window.localStorage.setItem('menuoBazaAgordoj', JSON.stringify($scope.menuoBazaAgordoj));
  }

});
