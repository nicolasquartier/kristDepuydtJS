"use strict";

(function () {
  angular.module("kristDepuydt.core").provider("flickrService", function () {
    return {
      $get: function ($http, $q, apiUrl, apiKey, userId) {
        return {
          getPhotoSets: function () {
            var defer = $q.defer();
            var photosets = [];
            $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' + apiKey + '&user_id=' + userId + '&format=json&jsoncallback=JSON_CALLBACK')
              .success(function (data) {
                if (data.code === 1) {
                  console.log(data.message);
                } else {
                  for (var i = 0; i < data.photosets.photoset.length; i++) {
                    photosets.push({
                      id: data.photosets.photoset[i].id,
                      name: data.photosets.photoset[i].title._content,
                      description: data.photosets.photoset[i].description._content
                    });
                  }
                  defer.resolve(photosets);
                }
              });
            return defer.promise;
          },
          getPhotos: function (photosetId) {
            var defer = $q.defer();
            var photos = [];
            // console.log("call getPhotos of photoSet: " + photosetId);
            $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + photosetId + '&user_id=' + userId + '&format=json&jsoncallback=JSON_CALLBACK')
              .success(function (photoset) {
                if (photoset.code === 1) {
                  console.log(photoset.message + " with id '" + photosetId + "'");
                } else {
                  for (var i = 0; i < photoset.photoset.photo.length; i++) {
                    var photoUrl = "https://farm" + photoset.photoset.photo[i].farm + ".staticflickr.com/" + photoset.photoset.photo[i].server + "/" + photoset.photoset.photo[i].id + "_" + photoset.photoset.photo[i].secret + "_b.jpg";
                    photos.push(photoUrl);
                  }
                }
                defer.resolve(photos);
              })
              .error(function (photoset) {
                console.log("fetching photos of photoset " + photosetId + " failed.");
              });
            return defer.promise;
          }
        }
      }
    }
  });
})();
