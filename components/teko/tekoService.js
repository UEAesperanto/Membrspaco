app.service('tekoService', function ($http, $window, config) {
    var service = this;

    service.getRevuoj = getRevuoj;
    service.getVolumoj = getVolumoj;
    service.getVolumonKovrilbildo = getVolumonKovrilbildo;
    service.getVolumonKvalita = getVolumonKvalita;
    service.getVolumonMalpeza = getVolumonMalpeza;
    service.getMp3 = getMp3;

    function getRevuoj() {
        return $http.get(config.api_url + '/revuoj');
    };

    function getVolumoj(revuonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/' + revuonId + '/volumoj',
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
      };
      return $http(req);
    }

    function getVolumonKovrilbildo(volumonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/volumoj/' + volumonId + '/bildo',
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
      };
      return $http(req);
    }

    function getMp3(volumonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/volumoj/' + volumonId + '/mp3',
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
      };
      return $http(req);
    };

    function getVolumonKvalita(volumonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/volumoj/' + volumonId + '/kvalita',
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
      };
      return $http(req);
    }

    function getVolumonMalpeza(volumonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/volumoj/' + volumonId + '/malpeza',
          headers: {'x-access-token': $window.localStorage.getItem('tokenUzanto')}
      };
        return $http(req);

    }
});
