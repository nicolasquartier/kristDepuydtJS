"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("appCtrl", AppCtrl);

  function AppCtrl(appVersion) {
    var that = this;
    that.ver = appVersion;
  }


})();
