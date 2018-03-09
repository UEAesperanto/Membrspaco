app.service('kontaktretoService', function ($http, config) {
  var service = this;

  service.getAnoj = getAnoj;

  function getAnoj(idGrupo) {
    return $http.get(config.api_url + "/grupoj/" + idGrupo + "/anoj");
  }

  return service;
});
