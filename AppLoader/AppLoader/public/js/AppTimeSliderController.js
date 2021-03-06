﻿(function () {
    "use strict";
    
    define(['angular', 'esri/map', "esri/layers/ArcGISImageServiceLayer", "esri/layers/ImageServiceParameters",
          "esri/layers/ArcGISDynamicMapServiceLayer", "esri/TimeExtent", "esri/dijit/TimeSlider",
          "dojo/_base/array", "dojo/dom", "dojo/domReady"],
         function (angular, Map, ArcGISImageServiceLayer, ImageServiceParameters,
              ArcGISDynamicMapServiceLayer, TimeExtent, TimeSlider, arrayUtils, dom) {
        
        function init(App) {
            App.controller('AppTimeSliderCtrl', [
                '$scope',
                function ($scope) {
                    
                    $scope.onClickButton = function () {
                        var center = new esri.geometry.Point(-101.15, 37.604, new esri.SpatialReference({
                                wkid: 4326
                            }));
                        $scope.map.centerAndZoom(center, 9);
                        $("#timeSliderPanel").css("visibility", "visible");
                    };
                    var params = new ImageServiceParameters();
                    params.noData = 0;
                    var opLayer = new ArcGISDynamicMapServiceLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Petroleum/KSWells/MapServer");
                    opLayer.setVisibleLayers([0]);
                    
                    //apply a definition expression so only some features are shown
                    var layerDefinitions = [];
                    layerDefinitions[0] = "FIELD_KID=1000148164";
                    opLayer.setLayerDefinitions(layerDefinitions);
                    
                    //add the gas fields layer to the map
                    $scope.map.addLayers([opLayer]);
                    
                    $scope.map.on("layers-add-result", initSlider);
                    
                    function initSlider() {
                        var timeSlider = new TimeSlider({
                            style: "width: 100%;"
                        }, dom.byId("timeSliderDiv"));
                        $scope.map.setTimeSlider(timeSlider);
                        
                        var timeExtent = new TimeExtent();
                        timeExtent.startTime = new Date("1/1/1921 UTC");
                        timeExtent.endTime = new Date("12/31/2009 UTC");
                        timeSlider.setThumbCount(2);
                        timeSlider.createTimeStopsByTimeInterval(timeExtent, 2, "esriTimeUnitsYears");
                        timeSlider.setThumbIndexes([0, 1]);
                        timeSlider.setThumbMovingRate(2000);
                        timeSlider.startup();
                        
                        //add labels for every other time stop
                        var labels = arrayUtils.map(timeSlider.timeStops, function (timeStop, i) {
                            if (i % 2 === 0) {
                                return timeStop.getUTCFullYear();
                            } else {
                                return "";
                            }
                        });
                        
                        timeSlider.setLabels(labels);
                        
                        timeSlider.on("time-extent-change", function (evt) {
                            var startValString = evt.startTime.getUTCFullYear();
                            var endValString = evt.endTime.getUTCFullYear();
                            dom.byId("daterange").innerHTML = "<i>" + startValString + " and " + endValString + "<\/i>";
                        });
                    }
                }
            ]);
        }
        return {
            start: init
        };
    });
})();