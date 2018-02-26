app.service('errorService', function($window, auth) {
  this.error = function(error) {
    if (error.status == 403) {
      window.alert("La tempo de via sesio finiĝis, vi devas reensaluti");
      auth.elsaluti();
    } else {
      console.log(error);
      window.alert("Okazis ne atendita eraro dum kiam vi provis fari tion."+
                   " Erarkodo: " + error.status);
      $window.location.reload();
    }
  }
});
