app.service('errorService', function($window, auth) {
  this.error = function(error) {
    if (error.status == 403) {
      window.alert("La tempo de via sesio finiĝis, vi devas reensaluti");
      auth.elsaluti();
    } else if (error.status == -1) {
      $window.location.reload();
    } else {
      console.log(error);
      console.log(error.data);
      window.alert("Okazis ne atendita eraro dum kiam vi provis fari tion."+
                   " Erarkodo: " + error.status);
      $window.location.reload();
    }
  }
  
  this.errorMembro = function(error) {
    if (error.status == 403) {
      window.alert("Vi ne estas estas membro, do vi ne havas aliron al tio.");
    }
  }
});
