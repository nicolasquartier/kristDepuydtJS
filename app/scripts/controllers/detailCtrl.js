"use strict";

(function() {
  angular.module("movieCatalog")
    .controller("detailCtrl", DetailCtrl);

  function DetailCtrl($routeParams, $http, apiUrl, dataService) {
    var that = this;
    that.movieId = $routeParams.movieId;
    that.movie = {};

    (function() {  // init
      console.log(apiUrl + that.movieId);
      dataService.getDetailsMovie(that.movieId).then(function(data) {
        that.movie = data;
      });
    })();

    that.seenMovie = function() {
      console.log(apiUrl + that.movie.id + ": " + that.movie.seen);
      var obj = {
        "seen": that.movie.seen
      };

      dataService.seenMovie(that.movie.id, obj).then(function() {
        console.log("see movie successfully");
      });

    };
  }

})();
