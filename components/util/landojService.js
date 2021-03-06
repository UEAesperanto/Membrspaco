app.service('landojService', function ($http, config, $window) {
    var service = this;

    service.getLandoj = getLandoj;
    service.getInfoPriLanda = getInfoPriLanda;
    service.getInfoPriCxiujLandoj = getInfoPriCxiujLandoj;

    function getLandoj(id) {
      var url = config.api_url + '/landoj';
      if(id){
        url = config.api_url + '/landoj?id=' + id;
      }
      return $http.get(url);
    }

    function getInfoPriLanda(landkodo) {
       return $http.get("https://restcountries.eu/rest/v2/alpha/" + landkodo);
    };

    function getInfoPriCxiujLandoj() {
       return $http.get("https://restcountries.eu/rest/v2/all");
    };

    return service;
});
