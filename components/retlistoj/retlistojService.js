app.service('retlistojService', function ($http, $window, config) {
    var service = this;

    service.getRetlistoj = getRetlistoj;
    service.getAbonanto = getAbonanto;
    service.postAbonanto = postAbonanto;
    service.removeAbonanto = removeAbonanto;

    function getRetlistoj() {
        var req = {
            method: 'GET',
            url: config.api_url + '/dissendoj/retlistoj',
        };
        return $http(req);
      }

    function getAbonanto(id, retposxto) {
        var req = {
            method: 'GET',
            url: config.api_url + '/dissendoj/retlistoj/' + id + '/abonantoj/' + retposxto,
        };
        return $http(req); 
    }

    function postAbonanto(id, retposxto) {
        data = {retadreso: retposxto};
        var req = {
            method: 'POST',
            url: config.api_url + '/dissendoj/retlistoj/' + id + '/abonantoj',
            data: data
        };
        return $http(req);
    }

    function removeAbonanto(retlistoId, abonantoId) {
        var req = {
            method: 'DELETE',
            url: config.api_url + '/dissendoj/retlistoj/' + retlistoId + '/abonantoj/' + abonantoId,
        };

        return $http(req);
    }
});
