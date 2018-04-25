app.service('loginService', function($http, config, $window){
	var service = this;

	service.doEnsaluti = doEnsaluti;
	service.forgesis = forgesis;
	service.senpasvorto = senpasvorto;

	function doEnsaluti(data){
		return $http.post(config.api_url + '/uzantoj/ensaluti', data);
	}

	function forgesis(data){
		return $http.post(config.api_url + '/uzantoj/forgesisPasvorton', data);
	}

	function senpasvorto(data) {
		return $http.get(config.api_url + '/uzantoj/ensaluti/senpasvorto?' + data);
	}

	return service;
});
