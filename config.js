app.service('config', function($http){
  var service = this;

  service.api_url = "http://localhost:3000";
  service.url_aligxilo = "http://nova.uea.esperanto.net/alighu/";
  service.getConfig = getConfig;

  function getConfig(valoro) {
    return $http.get(service.api_url + "/config/" + valoro);
  }

  return service;
});
