angular.module('safeSnap.services', [])

.factory('UserSession', function($resource, api) {
  return $resource(api.url("users/sign_in.json"));
})

.factory('api', function() {
  return {
    url: function(path) {
      return this.base() + path;
    },
    base: function() {
      if ( this.isTestMode() ) {
        return "http://localhost:3000/"
      } else {
        return "http://safesnap.herokuapp.com/"
      }
    },
    // isLocalhost: function() {
    //   return ionic.Platform.platform() === "macintel" && !this.isHttps();
    // },
    isTestMode: function() {
      return true;
    },
    // isHttps: function() {
    //   return window.location.origin.split(':')[0] == "https";
    // }
  }
})

.factory('Patients', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // var patients = [{
  //   id: 0,
  //   full_name: 'Ben Sparrow',
  //   profile_photo_url: 'img/profile_photos/ben.png',
  //   image_sets: [{
  //     id: 0,
  //     name: "Foot",
  //     description: "Foot Photos",
  //     created_at: "Aug 25",
  //     images: [
  //     {
  //       url: "img/wound_imgs/wound2.png",
  //       added_date: "Feb 19",
  //       desc: "Week 3, hole is massive"
  //     },
  //     {
  //       url: "img/wound_imgs/wound3.png",
  //       added_date: "Feb 13",
  //       desc: "Week 2, hole is huge"
  //     },
  //     {
  //       url: "img/wound_imgs/wound2.png",
  //       added_date: "Feb 12",
  //       desc: "Week 1, hole getting bigger"
  //     },
  //     {
  //       url: "img/wound_imgs/wound1.png",
  //       added_date: "Feb 3",
  //       desc: "Week 0, looks ok"
  //     }]
  //   },
  //   {
  //     id: 1,
  //     name: "Arm",
  //     description: "Arm Photos",
  //     created_at: "Feb 3",
  //     images: [{
  //       url: "img/wound_imgs/wound1.png",
  //       added_date: "Feb 3",
  //       desc: "Week 0, looks ok"
  //     },
  //     {
  //       url: "img/wound_imgs/wound2.png",
  //       added_date: "Feb 12",
  //       desc: "Week 1, hole getting bigger"
  //     },
  //     {
  //       url: "img/wound_imgs/wound3.png",
  //       added_date: "Feb 13",
  //       desc: "Week 2, hole is huge"
  //     },
  //     {
  //       url: "img/wound_imgs/arm.jpg",
  //       added_date: "Feb 19",
  //       desc: "Week 3, hole is massive"
  //     }]
  //   }]
  // }];
  var patients = null;


  return {
    all: function() {
      return patients;
    },
    remove: function(patient) {
      patients.splice(patients.indexOf(patient), 1);
    },
    get: function(patientId) {
      for (var i = 0; i < patients.length; i++) {
        if (patients[i].id === parseInt(patientId)) {
          return patients[i];
        }
      }
      return null;
    },
    getSet: function(patientId, setId) {
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
    }
  };
})

