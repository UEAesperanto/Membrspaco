app.service('errorService', function($window, auth) {
  this.error = function(error) {
    if (error.status == 403) {
      window.alert("La tempo de via sesio finiĝis, vi devas reensaluti");
      auth.elsaluti();
    } else {
      console.log(error);
      $window.location.reload();
    }
  }
});
