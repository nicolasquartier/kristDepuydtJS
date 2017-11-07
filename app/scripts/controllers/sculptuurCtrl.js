"use strict";

(function () {
  angular.module("kristDepuydt")
    .controller("sculptuurCtrl", SculptuurCtrl);

  function SculptuurCtrl(appVersion, $rootScope, flickrService, pages) {
    var that = this;
    that.ver = appVersion;
    that.sculptuurPhotosets = [];

    console.log($rootScope.photosets);
    flickrService.getPhotoSets().then(function (globalPhotosets) {
      console.log(globalPhotosets);

      for (var i = 0; i < globalPhotosets.length; i++) {
        that.sculptuurPhotosets.push(globalPhotosets[i]);
        for (var j = 0; j < pages.length; j++) {
          if (pages[j].toUpperCase() === globalPhotosets[i].name.toUpperCase()) {
            var k = that.sculptuurPhotosets.indexOf(globalPhotosets[i]);
            that.sculptuurPhotosets.splice(k, 1);
          }
        }
      }
      console.log(that.sculptuurPhotosets);
    });
  }
})();
