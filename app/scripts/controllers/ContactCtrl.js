"use strict";

(function () {
  angular.module("kristDepuydt")
    .controller("contactCtrl", ContactCtrl);

  function ContactCtrl($http, $scope) {
    var that = this;
    that.contactDetails = {};

    $http.get('data/contact.json').then(function onSuccess(response) {
      that.contactDetails.name = response.data.name;
      that.contactDetails.address = response.data.address;
      that.contactDetails.phone = response.data.phone;
      that.contactDetails.mobilePhone = response.data.mobilePhone;
      that.contactDetails.email = response.data.email;
    }).catch(function onError(response) {
      console.log("error: " + response);
    });

    var object = new Object();
    object.name = "test";


    // $http.get('data/getContactDetails.php').then(function (response) {
    // $http({
    //   method: 'GET',
    //   url: 'http://localhost/data/getContactDetails.php',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin':'*'
    //   }
    // }).then(function (response) {
    //   console.log(JSON.stringify(response));
    // }).catch(function (response) {
    //   console.log("error: " + JSON.stringify(response))
    // });

    // $http.post('http://localhost:8000/data/getContactDetails.php', object).then(function onSuccess(response) {
    //   console.log(JSON.stringify(response));
    // }).catch(function onError(response) {
    //   console.log("error: " + JSON.stringify(response))
    // });

    // $http.post('http://localhost:8000/data/getContactDetails.php', object).success(function (response) {
    //   console.log(JSON.stringify(response));
    // }).error(function (response) {
    //   console.log("error: " + JSON.stringify(response))
    // });

    // $http.jsonp("http://localhost:8000/data/getContactDetails.php", object)
    // $http.jsonp("http://localhost:8000/data/getContactDetails.php")
    //   .success(function (response) {
    //     console.log(JSON.stringify(response));
    //   })
    //   .error(function (response) {
    //     console.log("error: " + response)
    //   });
    // $http({
    //   method: 'POST',
    //   // url: 'http://localhost/data/getContactDetails.php',
    //   // url: 'localhost:9000/getContactDetails.php',
    //   url: 'http://localhost/data/getContactDetails.php',
    //   params: {
    //     // format: "post",
    //     // callback: "JSON_CALLBACK"
    //     // withCredentials: false
    //
    //   }
    //   ,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //     // 'Acces-control-allow-origin': '*'
    //   }
    // }).then(function (response) {
    //   console.log(JSON.stringify(response));
    // }).catch(function (response) {
    //   console.log("error: " + JSON.stringify(response))
    // });

    $http.post('http://localhost/data/getContactDetails.php', object).success(function (response) {
      console.log(JSON.stringify(response));
    }).error(function (response) {
      // console.log("error: " + JSON.stringify(response))
      console.log("error: " + JSON.stringify(response))
    });

    $scope.getNameOfElement = function (event) {
      var fullElementName = event.currentTarget.id;

      //get name of element
      var kindOfBtn = fullElementName.indexOf('btnEdit') > -1 ? "btnEdit" : "btnSave";
      var parts = fullElementName.split(kindOfBtn);
      return parts[parts.length - 1];
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

    $scope.toggleText = function (event) {
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

    $scope.toggleOtherLines = function () {
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
      $scope.toggleOtherLines();
      $scope.toggleOtherButtons();
      $scope.toggleButtons(event);
      $scope.toggleText(event);
    };

    $scope.save = function (event) {
      $scope.toggleOtherLines();
      $scope.toggleOtherButtons();
      $scope.toggleButtons(event);
      $scope.toggleText(event);

      $http.post('data/saveJson.php', that.contactDetails).then(function (data) {
        console.log("data saved");
        $scope.msg = 'Data saved';
      });
    };


  }


})();
