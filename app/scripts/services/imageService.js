"use strict";

(function() {
  angular.module("kristDepuydt.core").factory("imageService", function() {
    return {

      request: function(config) {
        config.headers["myHeader"] = "movie catalog";
        return config;
      }
    }
  });
})();
