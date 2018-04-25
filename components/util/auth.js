app.service('auth', function($window) {
  this.ensalutita = function() {
      if (($window.localStorage.getItem('tokenUzanto') == null) ||
          ($window.localStorage.getItem('tokenUzanto') == 0)) {
        $window.location.href = '#!/login';
        $widow.location.reload();
      }
  }

  this.elsaluti = function() {
    $window.localStorage.setItem('tokenUzanto', 0);
    $window.localStorage.setItem('uzanto', 0);
    $window.location.href = '#!/login';
    $window.location.reload();
    $window.localStorage.setItem('menuoBazaAgordoj', '}');
    $window.localStorage.setItem('menuoMembroj', '}');
  }
});
