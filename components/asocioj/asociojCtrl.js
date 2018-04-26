app.controller("asociojCtrl", function ($scope, $rootScope, auth) {
    $scope.init = function() {
        auth.ensalutita();
        $rootScope.menuo = true;

        google.maps.visualRefresh = true;
        var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) ||
          (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
        if (isMobile) {
          var viewport = document.querySelector("meta[name=viewport]");
          viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
        }
        var mapDiv = document.getElementById('googft-mapCanvas');
        mapDiv.style.width = isMobile ? '100%' : '850px';
        mapDiv.style.height = isMobile ? '100%' : '450px';
        var map = new google.maps.Map(mapDiv, {
          center: new google.maps.LatLng(13.848600470447943, -37.441107999999986),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend-open'));
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend'));

        layer = new google.maps.FusionTablesLayer({
          map: map,
          heatmap: { enabled: false },
          query: {
            select: "",
            from: "1El4SB7ANE9OqjiEvLLd7zPSGaxasOJstO5SR5QhI",
            where: ""
          },
          options: {
            styleId: 3,
            templateId: 3
          }
        });

        if (isMobile) {
          var legend = document.getElementById('googft-legend');
          var legendOpenButton = document.getElementById('googft-legend-open');
          var legendCloseButton = document.getElementById('googft-legend-close');
          legend.style.display = 'none';
          legendOpenButton.style.display = 'block';
          legendCloseButton.style.display = 'block';
          legendOpenButton.onclick = function() {
            legend.style.display = 'block';
            legendOpenButton.style.display = 'none';
          }
          legendCloseButton.onclick = function() {
            legend.style.display = 'none';
            legendOpenButton.style.display = 'block';
          }
        }
    }
});
