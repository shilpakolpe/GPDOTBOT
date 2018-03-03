'use strict';

const gpdotbot = require('./GPDOTBOTBot/gpdotbot');
const Greetings = require('./Greetings');

module.exports = function(intentRequest) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  console.log(intentName + ' was called');
  if (intentName === 'GPDOTBOT') {
    return gpdotbot(intentRequest);
  }

  if (intentName === 'Greeting') {
    return Greetings(intentRequest);
  }

  throw new Error(`Intent with name ${intentName} not supported`);
};
