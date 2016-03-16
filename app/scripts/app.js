"use strict";

(function() {
  angular.module("movieCatalog", ["movie.core", "movie.config"])
    .config(function(appVersion) {
      console.log("config movieCatalog" + appVersion);
    });
})();
