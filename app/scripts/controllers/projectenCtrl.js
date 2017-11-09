"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("projectenCtrl", ProjectenCtrl);

  function ProjectenCtrl(flickrService) {
    var that = this;
    that.projectenPhotoSetId = null;
    that.photos = [];
    that.pageTitle = "Projecten";
    that.currentPhotoDescription = [];

    flickrService.getPhotoSets().then(function (globalPhotosets) {
      for (var i = 0; i < globalPhotosets.length; i++) {
        if (globalPhotosets[i].name.toUpperCase() === that.pageTitle.toUpperCase()) {
          that.projectenPhotoSetId = globalPhotosets[i].id;
          break;
        }
      }
      console.log(that.projectenPhotoSetId);
      flickrService.getPhotos(that.projectenPhotoSetId).then(function (photos) {
        for (var i = 0; i < photos.length; i++) {
          that.photos.push(photos[i]);
        }
      });
    });
  }
})();
