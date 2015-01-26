(function() {
    "use strict";

    define(function() {

        function TimeSliderDirective() {
            return {
                restrict: 'AE',
                template: timeSliderView(),
                controller: 'AppTimeSliderCtrl'
            };
        }

        function timeSliderView() {

            var html = "<div id='timeSliderPanel' style=' background-color: white; position: absolute;  right: 300px; top: 700px; z-Index: 999;visibility: hidden;'>";
            html += "<div id='bottomPanel'  style='";
            html += "margin-left: -500px;";
            html += "position: absolute;";
            html += " top: 1000px; z-Index: 999;'></div>";

            html += "<div id='timeInfo' style='order-radius: 4px;";
            html += "border: solid 2px #ccc;";
            html += "background-color: #fff;";
            html += "display: block;";
            html += "padding: 5px;";
            html += "position: relative;";
            html += "text-align: center;";
            html += "width: 1000px;";
            html += "z-index: 999;'>";
            html += '<div>Time Slider <span id="daterange">1921 to 2009</span> (Completion date)</div>';
            html += '<div id="timeSliderDiv"></div>';
            html += '</div>';
            html += '</div>';
            html += "<div style=' background-color: white; position: absolute;  right: 50px; top: 10px; z-Index: 999;'><button type='button' class='btn btn-success' ng-click='onClickButton()'>Time Sider</button></div>";
            html += "</div>";
            return html;
        }

        function init(App) {

            $('<mapcanvastimeslider></mapcanvastimeslider>').appendTo('body');

            App.directive('mapcanvastimeslider', [TimeSliderDirective]);
            return TimeSliderDirective;
        }
        return {
            start: init
        };
    });
})();