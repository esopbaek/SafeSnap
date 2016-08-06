angular.module('safeSnap.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('PatientsCtrl', function($scope, Patients) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.patients = Patients.all();
  $scope.remove = function(patient) {
    Patients.remove(patient);
  };
})

.controller('PatientDetailCtrl', function($scope, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
  $scope.imageSet = $scope.patient.imageSet
})

.controller('ChoosePatientCtrl', function($scope, $stateParams, Patients) {
 $scope.patients = Patients.all();
})

.controller('TakePhotoCtrl', function($scope, $cordovaCamera, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
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
        $scope.pictureUrl = "data:image/jpeg;base64," + imageData;

        new_set = {
          url: $scope.pictureUrl,
          added_date: "Aug 6",
          desc: "Week 4, hole is huge"
        };
        $scope.patient.imageSet.images.push(new_set);
    }, function(err) {
        // error
    });
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
