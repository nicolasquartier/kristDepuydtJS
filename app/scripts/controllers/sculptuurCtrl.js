"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("sculptuurCtrl", SculptuurCtrl);

  function SculptuurCtrl(appVersion) {
    var that = this;
    that.ver = appVersion;
  }


})();
