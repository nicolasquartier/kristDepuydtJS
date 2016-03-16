"use strict";

(function() {
  angular.module("movieCatalog")
    .controller("collectionCtrl", CollectionCtrl);

  function CollectionCtrl($http, apiUrl, $location) {
    var that = this;

    that.movies = [];

    (function() {  // init
      $http.get(apiUrl).success(function(data) {
        for (var i = 0; i < data.length; i++) {
          that.movie = data[i];
          that.movies.push(that.movie);
          that.movie = "";
        }
        console.log("collection successfully loaded")
      });
    })();

    that.seeDetailsMovie = function(movie) {
      console.log("movie id: " + movie.id);
      $location.path("/detail/" + movie.id);
    }

    that.removeFromCollection  = function(movie) {
      $http.delete(apiUrl + movie.id).success(function(data) {
        console.log("movie succesfully deleted from collection");
        for (var i = 0; i < that.movies.length; i++) {
          that.m = that.movies[i];
          if(that.m.id == movie.id) {
            that.movies.splice(i, 1);
          }
        }
      });
    }
  }
})();

$('[data-toggle=confirmation]').confirmation('show');
