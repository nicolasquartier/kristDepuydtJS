"use strict";

(function() {
  angular.module("kristDepuydt.core")
    .factory("customHeaderService", function() {
    return {
      request: function(config) {
        config.headers["myHeader"] = "Krist Depuydt";
        return config;
      }
    }
  });
})();
