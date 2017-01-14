"use strict";

(function() {
  angular.module("movie.core", ["ngRoute", "angular-loading-bar"])
    .config(function ($routeProvider, $httpProvider) {

      $httpProvider.interceptors.push("customHeaderService");

      $routeProvider.when("/home", {
        templateUrl: "views/home.html",
        controller: "appCtrl",
        controllerAs: "appCtrl"
      });
      $routeProvider.when("/search/:Title?", {
        templateUrl: "views/search.html",
        controller: "searchCtrl",
        controllerAs: "searchCtrl"
      });
      $routeProvider.when("/detail/:movieId?", {
        templateUrl: "views/detail.html",
        controller: "detailCtrl",
        controllerAs: "detailCtrl"
      });
      $routeProvider.when("/collection", {
        templateUrl: "views/collection.html",
        controller: "collectionCtrl",
        controllerAs: "collectionCtrl"
      });
      $routeProvider.otherwise({
        redirectTo: "/home"
      });
    })
    .filter("skip", function() {
      return function(data, itemsToSkip) {
        if(angular.isArray(data) && angular.isNumber(itemsToSkip)) {
          if(itemsToSkip > data.length || itemsToSkip < 1) {
            return data;
          }
          else {
            return data.slice(itemsToSkip);
          }
        }
        else {
          return data;
        }
      };
    });
})();
