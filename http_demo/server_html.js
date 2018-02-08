/* Copyright 2017-present Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var http = require('http');
var port = 8080;
var path = '/light';

var Blinkt = require('blinkt');
var leds = new Blinkt();

var fs = require('fs');
var netiface = require('dns');

var numPixels = 8;

var server = http.createServer(function(req, res) {
  // The path for onoff.html is relevant. Here I assume that it's in the same directory of
  // the server file and iotjs binary. Change it in relevant to your iotjs binary path
  // Otherwise, put server_html.js and onoff.html in the same directory and have a symoblic
  // link of iotjs binary in that directory as well.

  console.log(req.url);
  var myval = req.url.split('/');
  console.log(myval[1]);
  //console.log()

  //netiface.lookupService('127.0.0.1', 22, (err, hostname, service), console.log(hostname, service));

  netiface.lookup('Zenbook-UX32A', function(err, address) {
    console.log(address);
  });

  //console.log(netiface.localName())

  if (myval[1] == 'light') {
    console.log('yahoo');
    fs.readFile('onoff.html', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': data.length
      });
      res.write(data);
      res.end();
    });

  } else {
    console.log('no way jose');
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    res.write(req.url);
    res.end();

  }
 if (req.method == 'POST') {
    receive(req, function(data) {
      console.log(data);
      if (data.indexOf("Rainbow") >= 0) {
        showRainbowLight();
      }
      else if (data.indexOf("Single") >= 0) {
        singleLightOn();
      }
    });
  }
}).listen(port);

function receive(incoming, callback) {
  var data = '';

  incoming.on('data', function(chunk) {
    data += chunk;
  });

  incoming.on('end', function() {
    callback ? callback(data) : '';
  });
}

function status(res, data) {
  var isJson = (typeof data === 'object');

  if (isJson) {
    data = JSON.stringify(data);
  }

  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': isJson ? 'application/json' : 'text/plain',
  };

  res.writeHead(200, headers);
  res.end(data);
};


function showRainbowLight() {
  try {
    leds.setup();
  } catch (e) {
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
    leds.setPixel(i, 255, 0, 0, 1);
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

  try {
    leds.setup();
  } catch (e) {
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


    for (var i = 0; i < max_pixels; i++) {
      //console.log(" in setLed loop - value is: " + value + " and max_pixels are: " + max_pixels + " loop counter is: " + i);

      if (value == i) {
        console.log(" ********** seting pixel : " + i + " only **********");
        leds.setPixel(i, 255, 255, 255, 0.75);
      } else {
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

  for (var s = 0; s < led_sequence_array; s++) {
    console.log(" ** Testing LED number: " + s + " *");

    switch (s) {
      case 0:
        {
          console.log("case 0");
          setLed(0, numPixels);
          break;
        }

      case 1:
        {
          console.log("case 1");
          setLed(1, numPixels);
          break;
        }

      case 2:
        {
          console.log("case 2");
          setLed(2, numPixels);
          break;
        }

      case 3:
        {
          console.log("case 3");
          setLed(3, numPixels);
          break;
        }

      case 4:
        {
          console.log("case 4");
          setLed(4, numPixels);
          break;
        }

      case 5:
        {
          console.log("case 5");
          setLed(5, numPixels);
          break;
        }
      case 6:
        {
          console.log("case 6");
          setLed(6, numPixels);
          break;
        }

      case 7:
        {
          console.log("case 7");
          setLed(7, numPixels);
          break;
        }

      default:
        console.log("switch statement error...");
    }

  }
  // Reset all LED's to switch them off.
  var timeout = setTimeout(function() {
    leds.clearAll();
    leds.sendUpdate();
    console.log("******** All LED's are cleared. *******");
  }, 1000);
}
