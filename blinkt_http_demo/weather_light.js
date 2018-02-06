var https = require("https");
var Blinkt = require('blinkt');
var leds = new Blinkt();

var numPixels = 8;

var options = {
  hostname: 'api.openweathermap.org',
  port: 443,
  path: '/data/2.5/weather?q=London,uk%20forecast?id=524901&APPID=c96d8df876bd744bed69e40c4fc891f7', //TODO remove key
  method: 'GET',
};

https.request(options, function (res) {
  receive(res, function (data) {
    console.log("log: received:");
    console.log(data);
    var body = JSON.parse(data);
    console.log(body);
    console.log(body.visibility);
     if (body.visibility < 10001)
     {
      console.log("turn light on");
   //    socket.end('Hello IoT.js');
      turnlighton();
     }
  });
}).end();

function receive(incoming, callback) {
  var data = '';

  incoming.on('data', function (chunk) {
    data += chunk;
  });

  incoming.on('end', function () {
    callback ? callback(data) : '';
  });
}



function turnlighton() {
  try
  {
  leds.setup();
  }
  catch (e)
  {
    console.error(e);
  }

  console.log("Starting LED light program.");
  leds.clearAll();

  // ***********************************
  // Testing maximum r g b values at 50%
  // ***********************************
  console.log("* Testing all LED's are RED at 50% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 255, 0, 0, 0.5);
  }

  leds.sendUpdate();

  console.log("* Testing all LED's are GREEN at 50% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 0, 255, 0, 0.5);
  }

  leds.sendUpdate();

  console.log("* Testing all LED's are BLUE at 50% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 0, 0, 255, 0.5);
  }

  leds.sendUpdate();


  // ************************************
  // Testing maximum r g b values at 100%
  // ************************************

  console.log("* Testing all LED's are RED at 100% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 255, 0, 0, 1);
  }

  leds.sendUpdate();

  console.log("* Testing all LED's are GREEN at 100% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 0, 255, 0, 1);
  }

  leds.sendUpdate();

  console.log("* Testing all LED's are BLUE at 100% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 0, 0, 255, 1);
  }

  leds.sendUpdate();


  // *************************************************
  // Testing maximum white values at 10%, 50% and 100%
  // *************************************************


  console.log("* Testing all LED's are WHITE at 10% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 255, 255, 255, 0.1);
  }

  leds.sendUpdate();

  console.log("* Testing all LED's are WHITE at 50% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 255, 255, 255, 0.5);
  }

  leds.sendUpdate();

  console.log("* Testing all LED's are WHITE at 100% intensity *");
  for (var i = 0; i < numPixels; i++) {
    leds.setPixel(i, 255, 255, 255, 1);
  }

  leds.sendUpdate();


  // Reset all LED's to switch them off.
  var timeout = setTimeout(function() {
  	leds.clearAll();
  	leds.sendUpdate();
  	console.log("******** All LED's are cleared. *******");
  }, 1000);
}
