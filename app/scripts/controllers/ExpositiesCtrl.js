"use strict";

(function () {
  angular.module("kristDepuydt")
    .controller("expositiesCtrl", ExpositiesCtrl);

  function ExpositiesCtrl(flickrService, $http) {
    var that = this;
    that.photos = [];
    that.pageTitle = "Exposities";
    that.photosetsTemp = [];
    that.expositiePhotosets = [];
    that.expositiesPerYear = [];
    that.years = [];

    flickrService.getPhotoSets().then(function (globalPhotosets) {
      for (var i = 0; i < globalPhotosets.length; i++) {
        if (globalPhotosets[i].name.toUpperCase().indexOf(that.pageTitle.toUpperCase()) >= 0) {
          that.photosetsTemp.push({
            name: globalPhotosets[i].name.replace("Exposities: ", ""),
            description: globalPhotosets[i].description,
            id: globalPhotosets[i].id
          });
        }
      }

      $http.get('../../data/exposities.json').then(function onSuccess(response) {
        var currentYear = "";
        var expositiesPerYearTemp = [];
        var expositie;
        for (var i = 0; i < response.data.length; i++) {
          expositie = response.data[i];
          if (expositie.hasPhotos === true) {
            console.log(expositie.name + ": " + expositie.hasPhotos);

            for (var l = 0; l < that.photosetsTemp.length; l++) {
              let id = that.photosetsTemp[l].id;
              let name = that.photosetsTemp[l].name;
              console.log("photosetstemp: " + id + " " + name)
              if (expositie.name.toUpperCase() === name.toUpperCase()) {
                console.log(name + " same");
                expositie.photos = flickrService.getPhotos(id).then(function (photosFromPhotoset) {
                  console.log(photosFromPhotoset + " are the fotos");
                  // that.expositiePhotosets.push({
                  //   id: id,
                  //   name: name,
                  //   description: description,
                  //   photos: photosFromPhotoset
                  // });
                  return photosFromPhotoset;
                  // expositie.photos = photosFromPhotoset;
                });
                break;
              }
            }
          }
          console.log(expositie);

          if (currentYear !== expositie.year) {
            console.log("length: " + expositiesPerYearTemp.length)
            if (expositiesPerYearTemp.length > 0) {
              that.expositiesPerYear.push({year: currentYear, exposities: expositiesPerYearTemp});
              expositiesPerYearTemp = [];
            }
            currentYear = expositie.year;
            expositiesPerYearTemp.push(expositie);
          } else {
            expositiesPerYearTemp.push(expositie);
          }
        }
        that.expositiesPerYear.push({year: currentYear, exposities: expositiesPerYearTemp});
        console.log(that.expositiesPerYear);
      }).catch(function onError(response) {
        console.log("error: " + response);
      });


    });
  }
})();
