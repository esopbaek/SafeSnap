// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('safeSnap', ['ionic', 'ngCordova', 'safeSnap.controllers', 'safeSnap.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.patients', {
    url: '/patients',
    views: {
      'tab-patients': {
        templateUrl: 'templates/tab-patients.html',
        controller: 'PatientsCtrl'
      }
    }
  })

  .state('tab.patient-detail', {
    url: '/patients/:patientId',
    views: {
      'tab-patients': {
        templateUrl: 'templates/patient-image-set.html',
        controller: 'PatientDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.choose-patient', {
    url: '/camera/choose-patient',
    views: {
      'tab-camera': {
        templateUrl: 'templates/choose-patient.html',
        controller: 'ChoosePatientCtrl'
      }
    }
  })

  .state('tab.take-photo', {
    url: '/camera/choose-patient/:patientId',
    views: {
      'tab-camera': {
        templateUrl: 'templates/take-photo.html',
        controller: 'TakePhotoCtrl'
      }
    }
  })

  .state('tab.submit-new-image', {
    url: '/camera/choose-patient/:patientId/:pictureUrl',
    views: {
      'tab-camera': {
        templateUrl: 'templates/new-image-info.html',
        controller: 'NewImageCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/patients');

});
