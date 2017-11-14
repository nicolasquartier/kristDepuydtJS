"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("adminCtrl", AdminCtrl);

  function AdminCtrl(appVersion) {
    var that = this;
    that.ver = appVersion;
  }


})();
