 app.service('profiloService', function ($http, $window, Upload, config) {
    var service = this;

    service.getUzanto = getUzanto;
    service.elsxutiBildon = elsxutiBildon;
    service.alsxultiBildon = alsxultiBildon;
    service.getGrupoj = getGrupoj;
    service.updateUzanto = updateUzanto;
    service.getGrupKat = getGrupKat;

    function getUzanto(id) {
      var req = {
          method: 'GET',
          url: config.api_url + '/uzantoj/' + id,
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
      };
      return $http(req);
    }

    function updateUzanto(id, data) {
      var req = {
          method: 'PUT',
          url: config.api_url + '/uzantoj/' + id,
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')},
          data: data
      };
      return $http(req);
    }

    function elsxutiBildon(id) {
      var req = {
          method: 'GET',
          url: config.api_url + '/uzantoj/' + id + '/bildo',
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
      };
      return $http(req);
    }

    function alsxultiBildon(id, file) {
      return Upload.upload({
          url: config.api_url + '/uzantoj/' + id + '/bildo',
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')},
          data:{file: file}
      });
    }

    function getGrupoj(id) {
      var req = {
        method: 'GET',
        url: config.api_url + '/uzantoj/' + id + '/grupoj',
        headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
      };
      return $http(req);
    }

    function getGrupKat(idKat) {
      return $http.get(config.api_url + "/grupoj/kategorioj/" + idKat + "/sub");
    }

    return service;
});
