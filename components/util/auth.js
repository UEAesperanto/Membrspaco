app.service('auth', function($window) {
  this.ensalutita = function() {
      if (($window.localStorage.getItem('token') == null) ||
          ($window.localStorage.getItem('token') == 0)) {
        $window.location.href = '#!/login';
      }
  }

  this.elsaluti = function() {
    $window.localStorage.setItem('token', 0);
    $window.localStorage.setItem('uzanto', 0);
    $window.location.href = '#!/login';
    $window.location.reload();
    $window.localStorage.setItem('menuoBazaAgordoj', '}');
    $window.localStorage.setItem('menuoMembroj', '}');
  }
});
