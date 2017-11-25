"use strict";

(function() {
  angular.module("kristDepuydt")
    .controller("contactCtrl", ContactCtrl);

  function ContactCtrl($http) {
    var that = this;
    that.contactDetails = {};

    $http.get('../../data/contact.json').then(function onSuccess(response) {
      that.contactDetails.name = response.data.name;
      that.contactDetails.address = response.data.address;
      that.contactDetails.phone = response.data.phone;
      that.contactDetails.mobilePhone = response.data.mobilePhone;
      that.contactDetails.email = response.data.email;
    }).catch(function onError(response) {
      console.log("error: " + response);
    });
  }


})();
