app.service('loginService', function($http, config, $window){
	var service = this;

	service.doEnsaluti = doEnsaluti;

	function doEnsaluti(data){
		return $http.post(config.api_url + '/uzantoj/ensaluti', data);
	}

	return service;
});
