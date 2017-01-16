"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("searchCtrl", SearchCtrl);

  function SearchCtrl(apiUrl, $http, $location, dataService) {
    var that = this;
    that.movieClicked = false;

    that.movie = [
      {
        title:"",
        clicked:false,
        imdbId:"",
        poster:""
      }
    ];

    that.selectedMovie = [
      {
        title:"",
        clicked:false,
        imdbId:"",
        poster:""
      }
    ];

    that.movies = [];

    that.search = function(title) {
      dataService.searchMovie(title).then(function(data) {
        for (var i = 0; i < data.length; i++) {
          that.movie = data[i];
          that.movies.push(that.movie);
          that.movie = "";
        }
        title = "";
      });
    };

    that.selectMovie = function(movie) {
      //that.selectedMovie.clicked = !that.selectedMovie.clicked;
      for (var i = 0; i < that.movies.length; i++) {
        that.movie =  that.movies[i];
        that.movie.clicked = false;
      }
      that.selectedMovie = null;

      that.selectedMovie = movie;
      that.selectedMovie.clicked = !that.selectedMovie.clicked;
      that.movieClicked = true;

      //collectionCtrl.addMovieToCollection(movie);
      console.log("imbdId: " + that.selectedMovie.imdbId);
    }

    that.addMovieToCollection = function() {
      console.log("add movie to collection: " + that.selectedMovie.imdbId);
      var obj = {
        "imdbId": that.selectedMovie.imdbId
      };

      dataService.addMovieToCollection(obj).then(function() {
        console.log("success");
        $location.path("/collection");
      });
    }
  }
})();
