"use strict";

(function() {
  angular.module("movie.core").factory("customHeaderService", function() {
    return {
      request: function(config) {
        config.headers["myHeader"] = "movie catalog";
        return config;
      }
    }
  });
})();
