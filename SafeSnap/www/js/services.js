angular.module('safeSnap.services', [])

.factory('Patients', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var patients = [{
    id: 0,
    name: 'Ben Sparrow',
    setCount: 3,
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    setCount: 2,
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    setCount: 4,
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    setCount: 1,
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    setCount: 2,
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
});
