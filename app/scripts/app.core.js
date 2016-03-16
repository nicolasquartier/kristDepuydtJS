"use strict";

(function() {
  angular.module("movie.core", ["ngRoute"])
    .config(function ($routeProvider) {
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
    });
})();
