(function() {
    "use strict";
    define([
        'angular', 'js/AppController.js'
    ], function(angular, AppController) {
        function init(App) {
            AppController.start(App);
            return App;
        };
        return {
            start: init
        };
    });
})();
