(function() {
    'use strict';
    define('angular', function() {
        if (angular) {
            return angular;
        }
        return {};
    });
      var db = 'http://localhost:1337/db/apps.js';
            
            require([db], function (apps) {
                var data = apps;
    });
    var appScripts = ['js/AppTimeSliderDirective.js', 'js/AppTimeSliderController.js'];

    require(['dojo/ready', 'js/baseMapBootstrap.js'], function(ready, baseMapBootstrap) {
        var App = angular.module('app', []);
        ready(function() {
            baseMapBootstrap.start(App);
            for (var index = 0; index < appScripts.length; index++) {
                var script = appScripts[index].toString();
                require(['dojo/ready', script], function(onReady, selectedScript) {
                    onReady(function() {
                        selectedScript.start(App);
                    });
                });
            }
            angular.element(document).ready(function() {
                angular.bootstrap(document, ['app']);
            });
        });
    });
})();