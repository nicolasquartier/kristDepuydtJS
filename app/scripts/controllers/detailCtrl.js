"use strict";

(function() {
  angular.module("movieCatalog")
    .controller("detailCtrl", DetailCtrl);

  function DetailCtrl($routeParams, $http, apiUrl) {
    var that = this;
    that.movieId = $routeParams.movieId;
    that.movie = [
      {
        id: that.movieId,
        title:"",
        year: "",
        runtime: "",
        plot: "",
        poster: "",
        rating: "",
        imdbId: "",
        seen: ""
      }
    ];

    (function() {  // init
      console.log(apiUrl + that.movieId);
      $http.get(apiUrl + that.movieId).success(function(data) {
        that.movie = data;
      });
    })();

    that.seenMovie = function() {
      that.movie.seen = true;
      console.log(apiUrl + that.movie.id);

      $http.put(apiUrl + that.movie.id, that.movie)
        .success(function(data) {
          console.log("seen the movie");
        })
        .error(function() {
          console.log("error");
        })
        .then(function(response) {
          if(response.status == "204") {
            console.log("Seen movie");
          }
          else {
            console.log("something went horribly wrong!");
          }
        });
    };
  }

})();
