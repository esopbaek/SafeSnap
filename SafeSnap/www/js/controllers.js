angular.module('safeSnap.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('RegistrationCtrl', function($http, $scope) {
   $scope.submit = function() {

   }

})

.controller('LoginCtrl', function($scope, $location, UserSession, $ionicPopup, $rootScope) {
  $scope.data = {};

  $scope.login = function() {
    var user_session = new UserSession({ user: $scope.data });
    user_session.$save(
      function(data){
        window.localStorage['userId'] = data.id;
        window.localStorage['userName'] = data.name;
        $location.path('/tab/patients');
      },
      function(err){
        var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'An error occured',
          template: error
        });
      }
    );
  }
})

.controller('PatientsCtrl', function($cordovaFileTransfer, $http, $scope, Patients, api) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.patients = [];
  
  var imageURI = './img/profile_photos/adam.png';

  var policyJSON = {
      "expiration": "2020-12-31T12:00:00.000Z",
      "conditions": [
          {"bucket": "safesnap"},
          ["starts-with", "$key", "uploads/"],
          {"acl": 'public-read'},
          ["starts-with", "$Content-Type", ""],
          ["content-length-range", 0, 524288000]
      ]
  };

  $http.get(api.url("api/physicians/1/patients"))
    .success(function(data) {
      $scope.patients = data;
    })

  var scope = $scope;
  $scope.remove = function(patient) {
    var deleteUrl = api.url("api/physicians/1/patients/" + patient.id);
    $http({
    method: 'DELETE',
    data: { id: patient.id },
    url: deleteUrl,
      }).then(function successCallback(response) {
        // BUG make sure jsons match up perfectly for correct delete UI
        $scope.patients.splice(response.data, 1);
        // $state.go('tab.patients', {}, { reload: true });
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        alert("error while deleting patient");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
    });
  };
})

.controller('PatientDetailCtrl', function($http, $scope, $stateParams, api) {
  $http.get(api.url("api/physicians/1/patients"))
    .success(function(data) { 
      $scope.patients = data;
      var getPatientById = function(patients, patientId) {
        for (var i = 0; i < patients.length; i++) {
          if (patients[i].id === parseInt(patientId)) {
            return patients[i];
          }
        }
        return null;
      };

      var getSet = function(patients, patientId, setId) {
        for (var i = 0; i < patients.length; i++) {
          if (patients[i].id === parseInt(patientId)) {
            var patient = patients[i];
          }
        }
        for (var i = 0; i < patient.image_sets.length; i++) {
          if (patient.image_sets[i].id === parseInt(setId)) {
            return patient.image_sets[i];
          }
        }

        return null;
      };

      $scope.patients = data;
      $scope.patient = getPatientById($scope.patients, $stateParams.patientId);
      $scope.set = getSet($scope.patients, $stateParams.patientId, $stateParams.setId);
    })
})

.controller('ChoosePatientCtrl', function($http, $scope, $state, $stateParams, Patients, api) {
 $scope.isPatientChosen = false;
 $scope.patients = [];
 $http.get(api.url("api/physicians/1/patients"))
  .success(function(data) {
    $scope.patients = data;
  })

 $scope.toggleInputSelected = function() {
  $scope.inputSelected = true;
  if ($scope.isPatientChosen) {
    $scope.uncheckName();
  }
 }

 $scope.fillInPatientName = function(patientId, patientName) {
  $scope.patientId = patientId;
  $scope.isPatientChosen = true;
  document.getElementById('patient-name-input').innerText = patientName;

  // Grab set for chosen patient
 $scope.patient = [];
 $scope.sets = []
  var getUrl = api.url("api/physicians/1/patients/" + patientId);
  console.log(getUrl);
  $http.get(getUrl)
    .success(function(data) {
      $scope.patient = data;
      $scope.sets = $scope.patient.image_sets
    })
 };

 $scope.chooseSet = function(setId, setName) {
  $scope.setId = setId;
  setInput = document.getElementById('set-name-input')
  setInput.innerText = setName;
  $scope.isSetChosen = true;
  // go to choose photo page for corresponding patient + set
 }

 $scope.uncheckSet = function() {
  setInput = document.getElementById('set-name-input');
  setInput.innerText = ""
  $scope.isSetChosen = false;
 }

 $scope.uncheckName = function() {
  nameInput = document.getElementById('patient-name-input');
  nameInput.innerText = "";
  $scope.patientId = null;
  $scope.isPatientChosen = false;
  $scope.uncheckSet();
 }

 $scope.submit = function() {
  $state.go("tab.take-photo", {patientId: $scope.patientId, setId: $scope.setId });
 }
})

.controller('TakePhotoCtrl', function($http, $scope, $cordovaCamera, $state, $stateParams, Patients, api) {
  $scope.set = {};
  var getUrl = api.url("api/physicians/1/patients/" + $stateParams.patientId + "/image_sets/" + $stateParams.setId);
  $http.get(getUrl)
  .success(function(data) {
    $scope.set = data;
  });
  $scope.pictureUrl = 'http://placehold.it/300x300'
  
  $scope.takePicture = function() {
    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 250,
        targetHeight: 250,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };
     
    $cordovaCamera.getPicture(options).then(function(imageData) {

        var policyJSON = {
            "expiration": "2020-12-31T12:00:00.000Z",
            "conditions": [
                {"bucket": "safesnap"},
                ["starts-with", "$key", "uploads/"],
                {"acl": 'public-read'},
                ["starts-with", "$Content-Type", ""],
                ["content-length-range", 0, 524288000]
            ]
        };

        // var s3Uploader = (function () {
        //     var encodedSig = "TXRhWMe+P7OrC1uVSsp3/DmOpro=";
        //     var encodedPolicy = "eyJleHBpcmF0aW9uIj0+IjIwMjAtMTItMzFUMTI6MDA6MDAuMDAwWiIsICJjb25kaXRpb25zIj0+W3siYnVja2V0Ij0+InNhZmVzbmFwIn0sIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICJ1cGxvYWRzLyJdLCB7ImFjbCI9PiJwdWJsaWMtcmVhZCJ9LCBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdXX0=";
         
        //     var s3URI = encodeURI("https://safesnap.s3.amazonaws.com/"),
        //         policyBase64 = encodedPolicy,
        //         signature = encodedSig,
        //         awsKey = 'AKIAIWNSTQDM3EP5KTZQ',
        //         acl = "public-read";
         
        //     function upload(imageURI, fileName) {
        //         var deferred = $.Deferred(),
        //             ft = new FileTransfer(),
        //             options = new FileUploadOptions();
         
        //         options.fileKey = "file";
        //         options.fileName = fileName;
        //         options.mimeType = "image/jpeg";
        //         options.chunkedMode = false;
        //         options.params = {
        //             "key": fileName,
        //             "AWSAccessKeyId": awsKey,
        //             "acl": acl,
        //             "policy": policyBase64,
        //             "signature": signature,
        //             "Content-Type": "image/jpeg"
        //         };
         
        //         ft.upload(imageURI, s3URI,
        //             function (e) {
        //                 deferred.resolve(e);
        //             },
        //             function (e) {
        //                 deferred.reject(e);
        //             }, options);
         
        //         return deferred.promise();
         
        //     }
         
        //     return {
        //         upload: upload
        //     }
        // }());
        $scope.pictureUrl = "data:image/jpeg;base64," + imageData;
        // s3Uploader.upload($scope.pictureUrl, "text.txt");

        $state.go("tab.submit-new-image", {patientId: $stateParams.patientId, setId: $stateParams.setId, pictureUrl: $scope.pictureUrl });
    }, function(err) {
      alert("error");
        // error
    });
  }
  // $scope.test = function() {
  //   $state.go("tab.submit-new-image", {patientId: $stateParams.patientId, pictureUrl: $scope.pictureUrl });
  // }
})

.controller('NewImageCtrl', function($http, $scope, $state, $stateParams, Patients, api) {
  $scope.pictureUrl = $stateParams.pictureUrl;

  $scope.set = {};
  var getUrl = api.url("api/physicians/1/patients/" + $stateParams.patientId + "/image_sets/" + $stateParams.setId);
  $http.get(getUrl)
  .success(function(data) {
    $scope.set = data;
  });

  // $scope.submit = function() {
  //   new_image = {
  //     url: this.pictureUrl,
  //     desc: this.desc
  //   };
  //   $scope.set.images.unshift(new_image);
  //   $scope.pictureUrl = 'http://placehold.it/300x300';
  //   $state.go('tab.patients');
  // }

  var scope = $scope;
  $scope.submit = function() {
    var imageData = {
      url: this.pictureUrl,
      description: this.desc
    };

    var postUrl = api.url("api/physicians/1/patients/" + $stateParams.patientId + "/image_sets/" + $stateParams.setId + "/images");

    $http({
    method: 'POST',
    data: imageData,
    url: postUrl,
      }).then(function successCallback(response) {
        scope.set.images.unshift(response.data);
        $state.go('tab.patients');
        // $state.go('tab.patients', {}, { reload: true });
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        alert("error while creating patient");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
    });
  }
})

.controller('SetListCtrl', function($http, $scope, $state, $stateParams, Patients, api) {


  $http.get(api.url("api/physicians/1/patients"))
    .success(function(data) {
      $scope.patients = data;
      var getPatientById = function(patients, patientId) {
        for (var i = 0; i < patients.length; i++) {
          if (patients[i].id === parseInt(patientId)) {
            return patients[i];
          }
        }
        return null;
      };

      var getSet = function(patientId, setId) {
        for (var i = 0; i < patients.length; i++) {
          if (patients[i].id === parseInt(patientId)) {
            var patient = patients[i];
          }
        }
        for (var i = 0; i < patient.image_sets.length; i++) {
          if (patient.image_sets[i].id === parseInt(setId)) {
            return patient.image_sets[i];
          }
        }

        return null;
      };

      $scope.patient = getPatientById($scope.patients, $stateParams.patientId);
      // $scope.patient = Patients.get($stateParams.patientId);
      $scope.sets = $scope.patient.image_sets

      $scope.remove = function(set) {
        var patientId = $stateParams.patientId;
        var setId = set.id;
        var deleteUrl = api.url("api/physicians/1/patients/" + patientId + "/image_sets/" + setId);
        $http({
        method: 'DELETE',
        data: { id: patient.id },
        url: deleteUrl,
          }).then(function successCallback(response) {
            // BUG make sure jsons match up perfectly for correct delete UI
            $scope.sets.splice(response.data, 1);
            // $state.go('tab.patients', {}, { reload: true });
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            alert("error while deleting image set");
              // called asynchronously if an error occurs
              // or server returns response with an error status.
        });
      };
    })
})

.controller('NewSetCtrl', function($http, $scope, $state, $stateParams, api) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  today = mm + dd;

  $scope.patient = [];
  var getUrl = api.url("api/physicians/1/patients/" + $stateParams.patientId);
  console.log(getUrl);
  $http.get(getUrl)
    .success(function(data) {
      $scope.patient = data;
    })

  var scope = $scope;
  $scope.submit = function() {
    var data = {
      name: this.name,
      description: this.description,
      patient_id: parseInt($stateParams.patientId),
    };
    var url = api.url('api/physicians/1/patients/' + $stateParams.patientId + '/image_sets');

    $http({
    method: 'POST',
    data: data,
    url: url
      }).then(function successCallback(response) {
        scope.patient.image_sets.push(response.data);
        $state.go('tab.set-list', {patientId: $scope.patient.id}, {reload: true});
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        alert("error while creating image set");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
    });
  }
})

.controller('NewPatientCtrl', function($http, $scope, $state, $stateParams, Patients, api) {

  $scope.patients = [];
  $http.get(api.url("api/physicians/1/patients"))
    .success(function(data) {
      $scope.patients = data;
    })


  var scope = $scope;
  $scope.submit = function() {
    var nameArray = this.full_name.split(" ");
    var firstName = nameArray[0];
    var lastName = nameArray[1];

    var data = {
      first_name: firstName,
      last_name: lastName
    };

    $http({
    method: 'POST',
    data: data,
    url: api.url('api/physicians/1/patients')
      }).then(function successCallback(response) {
        console.log("patients before", scope.patients);
        scope.patients.push(response.data);
        console.log("patients", scope.patients);
        $state.go('tab.patients', {}, { reload: true })
        // $state.go('tab.patients', {}, { reload: true });
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        alert("error while creating patient");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
    });
  }
})

.controller('ChatsCtrl', function($scope, Patients) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.patients = Patients.all();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
