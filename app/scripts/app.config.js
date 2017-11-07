"use strict";

(function() {
  angular.module("kristDepuydt.config",[])
    .constant('appVersion', '0.0.1')
    .constant('apiUrl', 'https://angularbackend.azurewebsites.net/api/Movies/')
    .constant('apiKey', '9ea2d6569a63be3a09b76b405b4a4631')
    .constant('userId', '153009594%40N02')
    .constant('pages', ['sculptuur','keramiek','projecten','over','exposities', 'contact']);
})();
