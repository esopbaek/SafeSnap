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
  $scope.set = Patients.getSet($stateParams.patientId, $stateParams.setId);
})

.controller('ChoosePatientCtrl', function($scope, $state, $stateParams, Patients) {
 $scope.isPatientChosen = false;
 $scope.patients = Patients.all();

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
  $scope.patient = Patients.get(patientId)
  $scope.sets = $scope.patient.sets
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

.controller('TakePhotoCtrl', function($scope, $cordovaCamera, $state, $stateParams, Patients) {
  $scope.set = Patients.getSet($stateParams.patientId, $stateParams.setId);
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

.controller('NewImageCtrl', function($scope, $state, $stateParams, Patients) {
  $scope.set = Patients.getSet($stateParams.patientId, $stateParams.setId);
  $scope.pictureUrl = $stateParams.pictureUrl;

  $scope.submit = function() {
    new_image = {
      url: this.pictureUrl,
      added_date: this.date,
      desc: this.desc
    };
    $scope.set.images.unshift(new_image);
    $scope.pictureUrl = 'http://placehold.it/300x300';
    $state.go('tab.patients');
  }
})

.controller('SetListCtrl', function($scope, $state, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
  $scope.sets = $scope.patient.sets
})

.controller('NewSetCtrl', function($scope, $state, $stateParams, Patients) {
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

  $scope.patient = Patients.get($stateParams.patientId);
  $scope.submit = function() {
    new_set = {
      id: $scope.patient.sets.length,
      name: this.name,
      description: this.desc,
      created_at: today,
      images: []
    };
    $scope.patient.sets.push(new_set);
    $state.go('tab.set-list', {patientId: $scope.patient.id});
  }
})

.controller('NewPatientCtrl', function($scope, $state, $stateParams, Patients) {
  $scope.patients = Patients.all();
  $scope.submit = function() {
    new_patient = {
      id: $scope.patients.length,
      name: this.name,
      sets: []
    };
    $scope.patients.push(new_patient);
    $state.go('tab.patients');
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
