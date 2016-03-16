"use strict";

(function() {
  angular.module("movie.config",[])
    .constant("appVersion","0.0.1")
    .constant('apiUrl', 'https://angularbackend.azurewebsites.net/api/Movies/');
})();
