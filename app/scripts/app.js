"use strict";

(function() {
  angular.module("kristDepuydt", ["kristDepuydt.core", "kristDepuydt.config"])
    .config(function(appVersion) {
      console.log("config movieCatalog" + appVersion);
    });
})();
