"use strict";

(function() {
  var app = angular.module("kristDepuydt.core", ["ngRoute", "angular-loading-bar"])
    .config(function ($routeProvider, $httpProvider, $locationProvider) {

      // $httpProvider.interceptors.push("customHeaderService");
      $locationProvider.html5Mode(true);

      $routeProvider.when("/", {
        templateUrl: "views/sculptuur.html",
        controller: "sculptuurCtrl",
        controllerAs: "sculptuurCtrl"
      });
      $routeProvider.when("/sculptuur", {
        templateUrl: "views/sculptuur.html",
        controller: "sculptuurCtrl",
        controllerAs: "sculptuurCtrl"
      });
      $routeProvider.when("/keramiek", {
        templateUrl: "views/keramiek.html",
        controller: "keramiekCtrl",
        controllerAs: "keramiekCtrl"
      });
      $routeProvider.when("/projecten", {
        templateUrl: "views/projecten.html",
        controller: "projectenCtrl",
        controllerAs: "projectenCtrl"
      });
      $routeProvider.when("/about", {
        templateUrl: "views/about.html",
        controller: "aboutCtrl",
        controllerAs: "aboutCtrl"
      });
      $routeProvider.when("/contact", {
        templateUrl: "views/contact.html",
        controller: "ContactCtrl",
        controllerAs: "ContactCtrl"
      });
      $routeProvider.when("/exposities", {
        templateUrl: "views/exposities.html",
        controller: "expositiesCtrl",
        controllerAs: "expositiesCtrl"
      });
      $routeProvider.when("/rudiquartier", {
        templateUrl: "views/rudiquartier.html",
        controller: "rudiquartierCtrl",
        controllerAs: "rudiquartierCtrl"
      });
      $routeProvider.otherwise({
        redirectTo: "/"
      });
    });
  app.run(function() {
    console.log("start app");
  });
})();
