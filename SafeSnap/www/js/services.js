angular.module('safeSnap.services', [])

.factory('Patients', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var patients = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'Ben your foot is fucked up',
    face: 'img/profile_photos/ben.png',
    sets: [{
      id: 0,
      name: "Foot",
      description: "Foot Photos",
      created_at: "Aug 25",
      images: [
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 19",
        desc: "Week 3, hole is massive"
      },
      {
        url: "img/wound_imgs/wound3.png",
        added_date: "Feb 13",
        desc: "Week 2, hole is huge"
      },
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 12",
        desc: "Week 1, hole getting bigger"
      },
      {
        url: "img/wound_imgs/wound1.png",
        added_date: "Feb 3",
        desc: "Week 0, looks ok"
      }]
    },
    {
      id: 1,
      name: "Arm",
      description: "Arm Photos",
      created_at: "Feb 3",
      images: [{
        url: "img/wound_imgs/wound1.png",
        added_date: "Feb 3",
        desc: "Week 0, looks ok"
      },
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 12",
        desc: "Week 1, hole getting bigger"
      },
      {
        url: "img/wound_imgs/wound3.png",
        added_date: "Feb 13",
        desc: "Week 2, hole is huge"
      },
      {
        url: "img/wound_imgs/arm.jpg",
        added_date: "Feb 19",
        desc: "Week 3, hole is massive"
      }]
    }]
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Take some Tylenol',
    face: 'img/profile_photos/max.png',
    imageSet: {
      name: "Foot",
      created_at: "Feb 3",
      set_desc: "Ben Sparrow is a 34 y/o man with diabetic complications. His diabetic foot wound healing will be monitored.",
      images: [{
        url: "img/wound_imgs/wound1.png",
        added_date: "Feb 3",
        desc: "Week 0, looks ok"
      },
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 12",
        desc: "Week 1, hole getting bigger"
      }]
    }
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'Your arm is getting worse',
    face: 'img/profile_photos/adam.jpg',
    imageSet: {
      name: "Arm",
      created_at: "Feb 3",
      set_desc: "Ben Sparrow is a 34 y/o man with diabetic complications. His diabetic foot wound healing will be monitored.",
      images: [{
        url: "img/wound_imgs/wound1.png",
        added_date: "Feb 3",
        desc: "Week 0, looks ok"
      },
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 12",
        desc: "Week 1, hole getting bigger"
      },
      {
        url: "img/wound_imgs/wound3.png",
        added_date: "Feb 19",
        desc: "Week 2, hole is huge"
      },
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 12",
        desc: "Week 3, hole is massive"
      }]
    }
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Progress looks good',
    face: 'img/profile_photos/perry.png',
    imageSet: {
      name: "Foot",
      created_at: "Feb 3",
      set_desc: "Ben Sparrow is a 34 y/o man with diabetic complications. His diabetic foot wound healing will be monitored.",
      images: [{
        url: "img/wound_imgs/wound1.png",
        added_date: "Feb 3",
        desc: "Week 0, looks ok"
      },
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 12",
        desc: "Week 1, hole getting bigger"
      },
      {
        url: "img/wound_imgs/wound3.png",
        added_date: "Feb 19",
        desc: "Week 2, hole is huge"
      }]
    }
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'It hurts a lot',
    face: 'img/profile_photos/mike.png',
    imageSet: {
      name: "Foot",
      created_at: "Feb 3",
      set_desc: "Ben Sparrow is a 34 y/o man with diabetic complications. His diabetic foot wound healing will be monitored.",
      images: [{
        url: "img/wound_imgs/wound1.png",
        added_date: "Feb 3",
        desc: "Week 0, looks ok"
      },
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 12",
        desc: "Week 1, hole getting bigger"
      },
      {
        url: "img/wound_imgs/wound3.png",
        added_date: "Feb 19",
        desc: "Week 2, hole is huge"
      },
      {
        url: "img/wound_imgs/wound2.png",
        added_date: "Feb 12",
        desc: "Week 3, hole is massive"
      }]
    }
  }];

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
      console.log(patient.name)
      console.log(patient.sets, setId)
      for (var i = 0; i < patient.sets.length; i++) {
        if (patient.sets[i].id === parseInt(setId)) {
          return patient.sets[i];
        }
      }

      return null;
    }
  };
})

