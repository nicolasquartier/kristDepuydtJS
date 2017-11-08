"use strict";

(function () {
  angular.module("kristDepuydt")
    .controller("sculptuurCtrl", SculptuurCtrl);

  function SculptuurCtrl(appVersion, $rootScope, flickrService, pages, $scope) {
    var that = this;
    that.ver = appVersion;
    that.sculptuurPhotosetsTemp = [];
    $scope.sculptuurPhotosets = [];

    console.log($rootScope.photosets);
    flickrService.getPhotoSets().then(function (globalPhotosets) {
      for (var i = 0; i < globalPhotosets.length; i++) {
        that.sculptuurPhotosetsTemp.push(globalPhotosets[i]);
        for (var j = 0; j < pages.length; j++) {
          if (pages[j].toUpperCase() === globalPhotosets[i].name.toUpperCase()) {
            var k = that.sculptuurPhotosetsTemp.indexOf(globalPhotosets[i]);
            that.sculptuurPhotosetsTemp.splice(k, 1);
          }
        }
      }

      for (var l = 0; l < that.sculptuurPhotosetsTemp.length; l++) {
        let id = that.sculptuurPhotosetsTemp[l].id;
        let name = that.sculptuurPhotosetsTemp[l].name;
        let description = that.sculptuurPhotosetsTemp[l].description;
        flickrService.getPhotos(that.sculptuurPhotosetsTemp[l].id).then(function (photosFromPhotoset) {
          $scope.sculptuurPhotosets.push({id: id,
            name: name,
            description: description,
            photos: photosFromPhotoset});
        });
      }

      setTimeout(function () {
        console.log($scope.sculptuurPhotosets);
      }, 2000);
    });
  }
})();
