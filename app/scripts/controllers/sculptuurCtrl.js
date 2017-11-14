"use strict";

(function () {
  angular.module("kristDepuydt")
    .controller("sculptuurCtrl", SculptuurCtrl);

  function SculptuurCtrl(appVersion, $rootScope, flickrService, pages, $scope) {
    var that = this;
    that.ver = appVersion;
    that.allPhotosetsTemp = [];
    that.sculptuurPhotosets = [];

    flickrService.getPhotoSets().then(function (globalPhotosets) {
      for (var i = 0; i < globalPhotosets.length; i++) {
        that.allPhotosetsTemp.push(globalPhotosets[i]);
        for (var j = 0; j < pages.length; j++) {
          if ((globalPhotosets[i].name.toUpperCase() === pages[j].toUpperCase())
            || (globalPhotosets[i].name.toUpperCase().indexOf(pages[j].toUpperCase()) !== -1)) {
            var k = that.allPhotosetsTemp.indexOf(globalPhotosets[i]);
            that.allPhotosetsTemp.splice(k, 1);
          }
        }
      }

      for (var l = 0; l < that.allPhotosetsTemp.length; l++) {
        let id = that.allPhotosetsTemp[l].id;
        let name = that.allPhotosetsTemp[l].name;
        let description = that.allPhotosetsTemp[l].description;
        flickrService.getPhotos(that.allPhotosetsTemp[l].id).then(function (photosFromPhotoset) {
          that.sculptuurPhotosets.push({
            id: id,
            name: name,
            description: description,
            photos: photosFromPhotoset
          });

          //Alphabetise list again
          that.sculptuurPhotosets.sort(compare);
        });
      }
    });

    function compare(a,b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }


  }
})();
