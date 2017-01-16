"use strict";

(function() {
  angular.module("kristDepuydt.core").provider("dataService", function() {
    return {
      $get: function($http, $q, apiUrl) {
        return {
          searchMovie: function (title) {
            var defer = $q.defer();
            $http.get(apiUrl + "/Search?title=" + title).success(function (data) {
              defer.resolve(data);
            });
            return defer.promise;
          },

          addMovieToCollection: function(obj) {
            var defer = $q.defer();
            $http.post(apiUrl, obj).success(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          },

          getCollection: function() {
            var defer = $q.defer();
            $http.get(apiUrl).success(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          },

          seenMovie: function(movieId, obj) {
            var defer = $q.defer();
            $http.put(apiUrl + movieId, obj).success(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          },

          getDetailsMovie: function(movieId) {
            var defer = $q.defer();
            $http.get(apiUrl + movieId).success(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          },

          deleteFromCollection: function(movie) {
            var defer = $q.defer();
            $http.delete(apiUrl + movie.id).success(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          }
        }
      }
    }
  });
})();
