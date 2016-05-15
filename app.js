(function() {
  
  "use strict";

  var DubAPI = require('dubapi');
  var config = require('./config.json');

  function hasValue(obj) {
    return obj !== undefined && obj !== null;
  }

  new DubAPI({ username: config.username, password: config.password }, function(err, bot) {
    if (err) {
      console.error(err);
      return;
    }

    bot.on('error', function(err) {
      console.error(err);
    });

    bot.on(bot.events.roomPlaylistUpdate, function(data) {
      if (hasValue(data) && hasValue(data.media)) {
        bot.sendChat(':metal: Raise your horns for ' + data.media.name + ' :metal:');
        bot.updub();
      }
    });

    bot.on(bot.events.chatMessage, function(data) {
      if (hasValue(data) && hasValue(data.user)) {
        console.log(data.user.username + ': ' + data.message);
      }
    });

    bot.on(bot.events.userJoin, function(data) {
      if (hasValue(data) && hasValue(data.user)) {
        bot.sendChat('Welcome to the Metal Underworld @' + data.user.username);
      }
    });

    bot.connect(config.room);
  });

})();
