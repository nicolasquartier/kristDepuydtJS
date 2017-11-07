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
                for (var i = 0; i < data.photosets.photoset.length; i++) {
                  photosets.push({id: data.photosets.photoset[i].id, name: data.photosets.photoset[i].title._content});
                }
                defer.resolve(photosets);
              });
            return defer.promise;
          }
        }
      }
    }
  });
})();
