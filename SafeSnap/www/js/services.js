angular.module('safeSnap.services', [])

.factory('Patients', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var patients = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/profile_photos/ben.png',
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
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
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
    lastText: 'I should buy a boat',
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
    lastText: 'Look at my mukluks!',
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
    lastText: 'This is wicked good ice cream.',
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
    }
  };
})

