"use strict";

(function () {
  var app = angular.module("kristDepuydt.core", ["ngCookies", "ngRoute", "angular-loading-bar"])
    .config(function ($routeProvider, $httpProvider, $locationProvider, $sceDelegateProvider) {

      // $httpProvider.interceptors.push("customHeaderService");
      // $httpProvider.interceptors.push("authenticationService");
      // $sceDelegateProvider.resourceUrlWhitelist([
      //   // Allow same origin resource loads.
      //   'self',
      //   // Allow loading from our assets domain. **.
      //   'https://api.flickr.com/**'
      // ]);
      $locationProvider.html5Mode(true);

      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common["Accept"] = "application/json";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

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
        controller: "contactCtrl",
        controllerAs: "contactCtrl"
      });
      $routeProvider.when("/contactBeheren", {
        templateUrl: "views/contactBeheren.html",
        controller: "contactCtrl",
        controllerAs: "contactCtrl"
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
  app.run(function ($rootScope, $location, $http, $cookies) {
    $rootScope.map = {13: false, 76: false};//13 = ENTER; 76 = L
    $rootScope.showLoginForm = false;
    $rootScope.ngKeyDown = function (event) {
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
      } else if (event.which === 27) {
        $rootScope.showLoginForm = false;
      }
    };
    $rootScope.ngKeyUp = function (event) {
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

    // keep user logged in after page refresh
    $rootScope.globals = $cookies.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in
      console.log("redirect to login page if not logged in");
      // if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
      //   $location.path('/login');
      // }
    });

    $rootScope.login = function ($scope, authenticationService) {
      authenticationService.login($scope.username, $scope.password, function (response) {
        if (response.success) {
          authenticationService.setCredentials($scope.username, $scope.password);
          $location.path('/');
        } else {
          $scope.error = response.message;
        }
      });
      console.log("login");
    }
  });
})();
