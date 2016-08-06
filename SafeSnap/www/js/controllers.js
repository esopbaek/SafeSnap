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

.controller('ChatDetailCtrl', function($scope, $stateParams, Patients) {
  $scope.chat = Patients.get($stateParams.patientId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
