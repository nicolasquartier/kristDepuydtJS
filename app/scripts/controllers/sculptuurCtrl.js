
"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("sculptuurCtrl", SculptuurCtrl);

  function SculptuurCtrl($http, appVersion) {
    var that = this;
    that.ver = appVersion;
  }
})();
