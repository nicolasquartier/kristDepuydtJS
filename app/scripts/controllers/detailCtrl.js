"use strict";

(function() {
  angular.module("movieCatalog")
    .controller("detailCtrl", DetailCtrl);

  function DetailCtrl($routeParams, $http, apiUrl) {
    var that = this;
    that.movieId = $routeParams.movieId;
    that.movie = {};

    (function() {  // init
      console.log(apiUrl + that.movieId);
      $http.get(apiUrl + that.movieId).success(function(data) {
        that.movie = data;
      });
    })();

    that.seenMovie = function() {
      console.log(apiUrl + that.movie.id + ": " + that.movie.seen);
      var obj = {
        "seen": that.movie.seen
      };

      $http.put(apiUrl + that.movie.id, obj)
        .success(function(data) {
          console.log("see movie successfully");
        })
        .error(function() {
          console.log("error");
        })
        .then(function(response) {
          if(response.status == "204") {
            console.log("see movie successfully");
          }
          else {
            console.log("something went horribly wrong!");
          }
        });
    };
  }

})();
