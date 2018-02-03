"use strict";

(function () {
  angular.module("kristDepuydt")
    .controller("contactCtrl", ContactCtrl);

  function ContactCtrl($http, $scope) {
    var that = this;
    that.contactDetails = {};

// working
    $http.jsonp("https://spreadsheets.google.com/feeds/list/12-g0i0TO4GN2xn4NzDy2S72SLFHLPEdFyz__mU9AJjE/1/public/values?alt=json&callback=JSON_CALLBACK")
      .success(function (response) {
        // $scope.tools = response.feed.entry;
        console.log(response.feed.entry);
        var contactData = response.feed.entry;
        that.contactDetails.name = contactData[0].gsx$name.$t;
        that.contactDetails.address = contactData[0].gsx$adres.$t;
        that.contactDetails.phone = contactData[0].gsx$tel.$t;
        that.contactDetails.mobilePhone = contactData[0].gsx$gsm.$t;
        that.contactDetails.email = contactData[0].gsx$email.$t;
      });

    $scope.getNameOfElement = function (event) {
      var fullElementName = event.currentTarget.id;

      //get name of element
      var kindOfBtn = fullElementName.indexOf('btnEdit') > -1 ? "btnEdit" : "btnSave";
      var parts = fullElementName.split(kindOfBtn);
      return parts[parts.length - 1];
    };

    $scope.showEditButtonAfterSave = function (event) {
      var name = $scope.getNameOfElement(event);

      //toggle btnEdit
      var btnEdit = angular.element(document.querySelector('#btnEdit' + name));
      btnEdit.css("display", 'inline');

      //toggle btnSave
      var btnSave = angular.element(document.querySelector('#btnSave' + name));
      btnSave.css("display", 'none');
    };

    $scope.toggleButtons = function (event) {
      var name = $scope.getNameOfElement(event);

      //toggle btnEdit
      var btnEdit = angular.element(document.querySelector('#btnEdit' + name));
      var styleBtnEdit = btnEdit.css("display") === "inline" ? "none" : "inline";
      btnEdit.css("display", styleBtnEdit);

      //toggle btnSave
      var btnSave = angular.element(document.querySelector('#btnSave' + name));
      var styleBtnSave = btnSave.css("display") === "inline" ? "none" : "inline";
      btnSave.css("display", styleBtnSave);
    };

    $scope.toggleDescriptionTextArea = function (event) {
      var name = $scope.getNameOfElement(event);

      //toggle span
      var spanText = angular.element(document.querySelector('#span' + name));
      var styleSpanText = spanText.css("display") === "inline" ? "none" : "inline";
      spanText.css("display", styleSpanText);

      //toggle input
      var txtInput = angular.element(document.querySelector('#txt' + name));
      var styleTxtInput = txtInput.css("display") === "inline" ? "none" : "inline";
      txtInput.css("display", styleTxtInput);
    };

    $scope.showText = function (event) {
      var name = $scope.getNameOfElement(event);

      //toggle span
      var spanText = angular.element(document.querySelector('#span' + name));
      spanText.css("display", 'inline');

      //toggle input
      var txtInput = angular.element(document.querySelector('#txt' + name));
      txtInput.css("display", 'none');
    };

    $scope.toggleOtherCollectionDescriptions = function () {
      //show span
      var spanTexts = angular.element(document.querySelectorAll('.contactDetailsText'));
      spanTexts.css("display", "inline");

      //disable input texts
      var inpuTexts = angular.element(document.querySelectorAll('.txtContactDetails'));
      inpuTexts.css("display", "none");
    };

    $scope.toggleOtherButtons = function () {
      //show span
      var btnEdits = angular.element(document.querySelectorAll('.edit'));
      btnEdits.css("display", "inline");

      //disable input texts
      var btnSaves = angular.element(document.querySelectorAll('.save'));
      btnSaves.css("display", "none");
    };

    $scope.edit = function (event) {
      $scope.save(event);
      $scope.toggleOtherCollectionDescriptions();
      $scope.toggleOtherButtons();
      $scope.toggleButtons(event);
      $scope.toggleDescriptionTextArea(event);
    };

    $scope.save = function (event) {
      $scope.toggleOtherCollectionDescriptions();
      $scope.toggleOtherButtons();
      $scope.showText(event);
      $scope.showEditButtonAfterSave(event);

      $('#spanContactName').text($('#txtContactName').val());
      $('#spanContactAddress').text($('#txtContactAddress').val());
      $('#spanContactPhone').text($('#txtContactPhone').val());
      $('#spanContactMobilePhone').text($('#txtContactMobilePhone').val());
      $('#spanContactEmail').text($('#txtContactEmail').val());

      $http({
        method: 'POST',
        url: 'https://script.google.com/macros/s/AKfycbykMeAZCscR5py9qpbMLCqPk6SqS4odAZq5YUnL0ybbJZauZw/exec',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          "name": $('#txtContactName').val(),
          "adres": $('#txtContactAddress').val(),
          "tel": $('#txtContactPhone').val(),
          "gsm": $('#txtContactMobilePhone').val(),
          "email": $('#txtContactEmail').val()
        }
      }).then(function (response) {
        console.log(JSON.stringify(response));
      }).catch(function (response) {
        console.log("error: " + JSON.stringify(response))
      });
    };
  }
})();
