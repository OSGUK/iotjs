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
      console.log("All light on");
      allLightOn();
     }
    else {
      console.log("Single light on");
       singleLightOn();
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



function allLightOn() {
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
    leds.setPixel(i, 255, 0, 0, 1);all
  }

  leds.sendUpdate();

  console.log("* Testing all LED's allare GREEN at 100% intensity *");
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


function singleLightOn() {

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

  leds.clearAll();
  leds.sendUpdate();

  // *************************************************
  // Testing each LED in sequence at 75%
  // *************************************************

  // A function which takes a pixel to illuminate and the size of the pixel strip
  function setLed(value, max_pixels) {


     for (var i=0; i< max_pixels; i++) {
  		//console.log(" in setLed loop - value is: " + value + " and max_pixels are: " + max_pixels + " loop counter is: " + i);

  		if (value == i){
  			console.log(" ********** seting pixel : " +  i + " only **********");
  			leds.setPixel(i, 255, 255, 255, 0.75);
  		}
  		else {
  			leds.setPixel(i, 0, 0, 0, 0.1);
  		}
  	}

     leds.sendUpdate();
     return 1;
  }



  console.log("* Testing all LED's are WHITE at 75% intensity *");

  // Loop round the strip as many times as  it's lenght and switch on each led in turn at 75% white.
  // This makes sure we can use low level functions just to light up one led at a time.
  var led_sequence_array = 8

  for (var s = 0; s < led_sequence_array; s ++){
  	console.log(" ** Testing LED number: " + s + " *");

  	switch(s)
  	{
                  case 0: {
                          console.log("case 0");
                          setLed(0, numPixels);
                          break;
                  }

  		case 1: {
  			console.log("case 1");
  			setLed(1, numPixels);
  			break;
  		}

                  case 2: {
                          console.log("case 2");
                          setLed(2, numPixels);
                          break;
                  }

                  case 3: {
                          console.log("case 3");
                          setLed(3, numPixels);
                          break;
                  }

                  case 4: {
                          console.log("case 4");
                          setLed(4, numPixels);
                          break;
                  }

                  case 5: {
                          console.log("case 5");
                          setLed(5, numPixels);
                          break;
                  }
                  case 6: {
                          console.log("case 6");
                          setLed(6, numPixels);
                          break;
                  }

                  case 7: {
                          console.log("case 7");
                          setLed(7, numPixels);
                          break;
                  }

  		default: console.log("switch statement error...");
  	}

  }
  // Reset all LED's to switch them off.
  var timeout = setTimeout(function() {
  	leds.clearAll();
  	leds.sendUpdate();
  	console.log("******** All LED's are cleared. *******");
  }, 1000);
}
