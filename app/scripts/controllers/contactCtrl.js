"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("contactCtrl", ContactCtrl);

  function ContactCtrl(appVersion) {
    var that = this;
    that.ver = appVersion;
  }


})();
