"use strict";

(function() {
  angular.module("movieCatalog")
    .controller("appCtrl", AppCtrl);

  function AppCtrl(appVersion) {
    var that = this;
    that.ver = appVersion;
  }

  (function() {  // init
    $http.get(apiUrl).success(function(data) {
      for (var i = 0; i < data.length; i++) {
        that.movie = data[i];
        that.movies.push(that.movie);
        that.movie = "";
      }
    });
  })();

})();
