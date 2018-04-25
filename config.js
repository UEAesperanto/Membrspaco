app.service('config', function($http){
  var service = this;

  service.api_url = "https://api.nova.uea.org";
  service.url_aligxilo = "http://nova.uea.esperanto.net/alighu/";
  service.getConfig = getConfig;

  service.auth0Domain = "uea.eu.auth0.com";
  service.auth0clientID = "vSU6gfEi5jvlxPj23ejYZpTSwmabubDB";

  function getConfig(valoro) {
    return $http.get(service.api_url + "/config/" + valoro);
  }

  return service;
});
