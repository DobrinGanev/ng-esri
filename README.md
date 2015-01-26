# ng-esri
manually start up angular apps
```javascript
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
```
