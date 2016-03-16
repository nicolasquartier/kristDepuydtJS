"use strict";

(function() {
  angular.module("movieCatalog")
    .controller("appCtrl", AppCtrl);

  function AppCtrl(appVersion) {
    var that = this;
    that.ver = appVersion;
  }
})();
