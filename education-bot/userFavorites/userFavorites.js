'use strict';

const databaseManager = require('../databaseManager');

module.exports = function(userId, AppointmentTypeValue, TEFL) {
  console.log(userId + ' ' + AppointmentTypeValue + ' ' + TEFL);

  databaseManager.saveUserToDatabase(userId, AppointmentTypeValue, TEFL).the  (item => {
    console.log(item);
  });
};
