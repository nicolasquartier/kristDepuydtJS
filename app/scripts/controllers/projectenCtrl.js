"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("projectenCtrl", ProjectenCtrl);

  function ProjectenCtrl(appVersion) {
    var that = this;
    that.ver = appVersion;
  }


})();
