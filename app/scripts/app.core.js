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

      $routeProvider.when("/admin", {
        templateUrl: "views/admin.html",
        controller: "adminCtrl",
        controllerAs: "adminCtrl"
      });
      $routeProvider.when("/sculptuurBeheren", {
        templateUrl: "views/SculptuurBeheren.html",
        controller: "sculptuurBeherenCtrl",
        controllerAs: "sculptuurBeherenCtrl"
      });
      $routeProvider.otherwise({
        redirectTo: "/"
      });
    });
  app.run(function($rootScope) {
    $rootScope.map = {13: false, 76: false};//13 = ENTER; 76 = L
    $rootScope.showLoginForm = false;
    $rootScope.ngKeyDown = function(event) {
      if (event.which in $rootScope.map) {
        // $rootScope.map[event.which] = true;
        $rootScope.map[event.which] = true;
        if ($rootScope.map[13] && $rootScope.map[76]) {
          // $rootScope.$apply(function(){
          // scope.$eval(attrs.ngShiftTab, {'event': event});
          console.log("pressed the two buttons");
          $rootScope.showLoginForm = !$rootScope.showLoginForm;
          // });
          event.preventDefault();
        }
      } else if(event.which === 27){
        $rootScope.showLoginForm = false;
      }
    };
    $rootScope.ngKeyUp = function(event) {
        if (event.which in $rootScope.map) {
          $rootScope.map[event.keyCode] = false;
        }
    };

    $rootScope.closeLoginForm = function () {
      $rootScope.showLoginForm = false;
    };

    $rootScope.altLWasPressed = function () {
      return $rootScope.showLoginForm;
    };
    console.log("start app");
  });
})();
