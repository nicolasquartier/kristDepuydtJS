"use strict";

(function () {
  angular.module("kristDepuydt")
    .controller("sculptuurBeherenCtrl", SculptuurBeherenCtrl);

  function SculptuurBeherenCtrl(appVersion, $rootScope, flickrService, pages, $scope) {
    var that = this;
    console.log("sculptuur beheren");


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
    };

    $scope.getNameOfElement = function (event) {
      var fullElementName = event.currentTarget.id;

      //get name of element
      var kindOfBtn = fullElementName.indexOf('btnEdit') > -1 ? "btnEdit" : "btnSave";
      console.log('kindOfBtn: ' + kindOfBtn);
      var parts = fullElementName.split(kindOfBtn);
      return parts[parts.length - 1];
    };

    $scope.toggleButtons = function (event) {
      var name = $scope.getNameOfElement(event);
      console.log(name + ' clicked');

      //toggle btnEdit
      var btnEdit = angular.element(document.querySelector('#btnEdit' + name));
      console.log('#btnEdit' + name + ' display was: ' + btnEdit.css("display"));
      var styleBtnEdit = (btnEdit.css("display") === "inline" || btnEdit.css("display") === "block") ? "none" : "inline";
      btnEdit.css("display", styleBtnEdit);
      console.log('#btnEdit' + name + ' must be ' + styleBtnEdit);

      //toggle btnSave
      var btnSave = angular.element(document.querySelector('#btnSave' + name));
      console.log('#btnSave' + name + ' display was: ' + btnSave.css("display"));
      var styleBtnSave = (btnSave.css("display") === "inline" || btnSave.css("display") === "block") ? "none" : "inline";
      btnSave.css("display", styleBtnSave);
      console.log('#btnSave' + name + ' must be ' + styleBtnSave)
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
      var spanTexts = angular.element(document.querySelectorAll('.spanPhotoSetDescription'));
      spanTexts.css("display", "inline");

      //disable input texts
      var inpuTexts = angular.element(document.querySelectorAll('.txtPhotoSetDescription'));
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
  }
})();
