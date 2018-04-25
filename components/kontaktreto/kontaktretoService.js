app.service('kontaktretoService', function ($http, config) {
  var service = this;

  service.getAnoj = getAnoj;
  service.getFakoj = getFakoj;

  function getAnoj(idGrupo) {
    return $http.get(config.api_url + "/grupoj/" + idGrupo + "/anoj");
  }

  function getFakoj() {
    return $http.get(config.api_url + "/faktemoj");
  }

  return service;
});
