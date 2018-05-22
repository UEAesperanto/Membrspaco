app.service('kontaktretoService', function ($http, $window, config) {
  var service = this;

  service.getAnoj = getAnoj;
  service.getFakoj = getFakoj;

  function getAnoj(idGrupo) {
    var req = {
        method: 'GET',
        url: config.api_url + "/grupoj/" + idGrupo + "/anoj",
        headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
    };
    return $http(req);
  }

  function getFakoj() {
    return $http.get(config.api_url + "/faktemoj");
  }

  return service;
});
