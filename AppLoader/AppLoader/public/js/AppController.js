(function () {
    "use strict";
    define(['angular', 'esri/map'], function (angular, Map) {
        
        function mapConfigs() {
            return {
                basemap: 'streets',
                center: [0, 0],
                zoom: 3
            };
        }
        
        function mapGen(elem) {
            return new Map(elem, mapConfigs());
        }
        
        function init(App) {
            App.controller('AppCtrl', [
                '$scope',
                function ($scope) {
                    $scope.map = mapGen('map');
                }
            ]);
        }
        return {
            start: init
        };
    });
})();