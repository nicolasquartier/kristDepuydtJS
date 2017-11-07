"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("keramiekCtrl", KeramiekCtrl);

  function KeramiekCtrl($http, apiKey, userId, flickrService) {
    var that = this;
    that.keramiekPhotoSetId = null;
    that.photos = [];
    that.pageTitle = "Keramiek";

    flickrService.getPhotoSets().then(function (globalPhotosets) {
      console.log(globalPhotosets);

      for (var i = 0; i < globalPhotosets.length; i++) {
        if(globalPhotosets[i].name.toUpperCase() === that.pageTitle.toUpperCase()) {
          console.log(globalPhotosets[i]);
          that.keramiekPhotoSetId = globalPhotosets[i].id;
          break;
        }
      }

      //jsonFlickrApi({"photoset":{"id":"72157681588862046","primary":"33447410801","owner":"153009594@N02","ownername":"nicolasquartier","photo":[{"id":"33447410801","secret":"b5dbd76a0f","server":"2827","farm":3,"title":"11","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33447408301","secret":"75f3d3f225","server":"2853","farm":3,"title":"12","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33447406531","secret":"7600fb6d88","server":"2916","farm":3,"title":"1","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33576558995","secret":"0374724098","server":"2900","farm":3,"title":"2","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33193192040","secret":"5f7bf6e425","server":"3944","farm":4,"title":"3","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33193191820","secret":"6bb7e8d95e","server":"2909","farm":3,"title":"4","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33193191470","secret":"d4dfaa2960","server":"3700","farm":4,"title":"5","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33193191150","secret":"e55175f090","server":"2817","farm":3,"title":"6","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33193190520","secret":"0e96a75ba4","server":"2891","farm":3,"title":"7","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33193189800","secret":"c53aac8508","server":"3930","farm":4,"title":"8","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33419631542","secret":"99b702abb1","server":"2947","farm":3,"title":"9","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"33447402201","secret":"54ba39b405","server":"3848","farm":4,"title":"10","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0},{"id":"24095971108","secret":"1afc73d6e7","server":"4466","farm":5,"title":"download.jpg","isprimary":"0","ispublic":0,"isfriend":0,"isfamily":0}],"page":1,"per_page":500,"perpage":500,"pages":1,"total":"13","title":"Keramiek"},"stat":"ok"})

      //1. Get list of photosets
      //https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=8c9c421071faf45e4c7a6863c5bf0163&user_id=153009594%40N02&format=json

      // jsonFlickrApi({"photosets":{"page":1,"pages":1,"perpage":3,"total":3,"photoset":[{"id":"72157678257561504","primary":"33576583365","secret":"2524788474","server":"3954","farm":4,"photos":12,"videos":0,"title":{"_content":"Exposities: Midwinterbeelden"},"description":{"_content":"Krist Depuydt: Exposities: Midwinterbeelden"},"needs_interstitial":0,"visibility_can_see_set":1,"count_views":"0","count_comments":"0","can_comment":0,"date_create":"1490129566","date_update":"1510004628"},{"id":"72157681588862046","primary":"33447410801","secret":"b5dbd76a0f","server":"2827","farm":3,"photos":13,"videos":0,"title":{"_content":"Keramiek"},"description":{"_content":"Krist Depuydt: Keramiek"},"needs_interstitial":0,"visibility_can_see_set":1,"count_views":"0","count_comments":"0","can_comment":0,"date_create":"1490129386","date_update":"1510004748"},{"id":"72157678343382753","primary":"32733050144","secret":"b8559a1380","server":"2945","farm":3,"photos":38,"videos":0,"title":{"_content":"RudiQuartier"},"description":{"_content":"Foto's van Rudi Quartier"},"needs_interstitial":0,"visibility_can_see_set":1,"count_views":"0","count_comments":"0","can_comment":0,"date_create":"1490127992","date_update":"1493320689"}]},"stat":"ok"})
      $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + that.keramiekPhotoSetId + '&user_id=' + userId + '&format=json&jsoncallback=JSON_CALLBACK')
        .success(function (photoset) {
          console.log(photoset.photoset.photo);

          for (var i = 0; i < photoset.photoset.photo.length; i++) {
            var photoUrl = "https://farm" + photoset.photoset.photo[i].farm + ".staticflickr.com/" + photoset.photoset.photo[i].server + "/" + photoset.photoset.photo[i].id + "_" + photoset.photoset.photo[i].secret + "_b.jpg";
            that.photos.push(photoUrl);
          }
          console.log(that.photos);

          //2. Get photos of photoset
          //https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=8c9c421071faf45e4c7a6863c5bf0163&photoset_id=72157681588862046&user_id=153009594%40N02&format=json

          //jsonFlickrApi({"photoset":{"id":"72157681588862046","primary":"33447410801","owner":"153009594@N02","ownername":"nicolasquartier","photo":[{"id":"33447410801","secret":"b5dbd76a0f","server":"2827","farm":3,"title":"11","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33447408301","secret":"75f3d3f225","server":"2853","farm":3,"title":"12","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33447406531","secret":"7600fb6d88","server":"2916","farm":3,"title":"1","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33576558995","secret":"0374724098","server":"2900","farm":3,"title":"2","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33193192040","secret":"5f7bf6e425","server":"3944","farm":4,"title":"3","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33193191820","secret":"6bb7e8d95e","server":"2909","farm":3,"title":"4","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33193191470","secret":"d4dfaa2960","server":"3700","farm":4,"title":"5","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33193191150","secret":"e55175f090","server":"2817","farm":3,"title":"6","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33193190520","secret":"0e96a75ba4","server":"2891","farm":3,"title":"7","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33193189800","secret":"c53aac8508","server":"3930","farm":4,"title":"8","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33419631542","secret":"99b702abb1","server":"2947","farm":3,"title":"9","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"33447402201","secret":"54ba39b405","server":"3848","farm":4,"title":"10","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"24095971108","secret":"1afc73d6e7","server":"4466","farm":5,"title":"download.jpg","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0}],"page":1,"per_page":500,"perpage":500,"pages":1,"total":"13","title":"Keramiek"},"stat":"ok"})

          //3. create urls of photos
          //url = "https://farm" + flickerData[i].farm + ".staticflickr.com/" + flickerData[i].server + "/" + flickerData[i].id + "_" + flickerData[i].secret + ".jpg";
        });

    });
  }
})();
