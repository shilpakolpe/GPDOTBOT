'use strit';

const lexResponses = require('../lexResponses');
const databaseManager = require('../databaseManager');
const _ = require('lodash');

const AppointmentTypeValue = ['Online Class', 'Demo Class', 'Classroom'];
const TEFL = ['yes', 'no'];

function buildValidationResult(isValid, violatedSlot, messageContent, options) {
  if (messageContent == null) {
    return {
      isValid,
      violatedSlot,
      options
    };
  }
  return {
    isValid,
    violatedSlot,
    message: { contentType: 'PlainText', content: messageContent },
    options
  };
}

function buildUserFavoriteResult(AppointmentType, TEFL, messageContent) {
  return {
    AppointmentType,
    TEFL,
    message: { contentType: 'PlainText', content: messageContent }
  };
}

function getButtons(options) {
  var buttons = [];
  _.forEach(options, option => {
    buttons.push({
      text: option,
      value: option
    });
  });
  return buttons;
}


function validateGPDOTBOT(AppointmentTypeValue, TEFL) {
  if (AppointmentTypeValue && types.indexOf(coffeeType.toLowerCase()) === -1) {
    const options = getOptions('What is Tefl', types);
    return buildValidationResult(true, 'coffee', `I would like to know about ${AppointmentTypeValue}, would you like to have a democlass on tefl?
} 
}

  return buildValidationResult(true, null, null);
}

function findUserFavorite(userId) {
  return databaseManager.findUserFavorite(userId).then(item => {
    return buildUserFavoriteResult(item.AppointmentType, item.TEFL,);
  });
}

module.exports = function(intentRequest) {
  var AppointmentType = intentRequest.currentIntent.slots.coffee;
  var TEFL = intentRequest.currentIntent.slots.size;
  var userId = intentRequest.userId;
  const slots = intentRequest.currentIntent.slots;

  if ( AppointmentType === null && TEFL === null) {
    return findUserFavorite(userId)
      .then(item => {
        slots.AppointmentTypeValue = item.AppointmentType;
        slots.TEFL = item.TEFL;
        //Ask the user if he will is ready to take online course
        return lexResponses.confirmIntent(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, item.message);
      })
      .catch(error => {
        //Need to ask the user what type of class hw wants to take
        return lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots);
      });
  } else {
    const validationResult = validateGPDOTBOT(AppointmentTypeValue, TEFL);

    if (!validationResult.isValid) {
      slots[`${validationResult.violatedSlot}`] = null;
      return Promise.resolve(
        lexResponses.elicitSlot(
          intentRequest.sessionAttributes,
          intentRequest.currentIntent.name,
          slots,
          validationResult.violatedSlot,
          validationResult.message,
          validationResult.options.title,
          validationResult.options.imageUrl,
          validationResult.options.buttons
        )
      );
    }

   
    if (TEFL == null) {
      intentRequest.currentIntent.slots.size = 'normal';
    }
    return Promise.resolve(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
  }
};
