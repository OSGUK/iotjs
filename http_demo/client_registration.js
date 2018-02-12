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
var fs = require('fs');

var IPMAC = [];
IPMAC = getIPMAC();

var message = JSON.stringify({
  device_id: IPMAC[1][0],
  device_name: 'IoT Device Raspberry Pi0-W',
  local_ip: IPMAC[0][0],
});

var options = {
  hostname: 'www.noisyatom.tech',
  port: 80,
  path: '/iot/register/',
  method: 'POST',
  headers: {
    'Content-Length': message.length
  }
};

http.request(options, function(res) {
  receive(res, function(data) {
    var obj = JSON.parse(data);
    console.log(obj);
  });
}).end(message);

function receive(incoming, callback) {
  var data = '';

  incoming.on('data', function(chunk) {
    data += chunk;
  });

  incoming.on('end', function() {
    callback ? callback(data) : '';
  });
}

function getIPMAC() {
  var fd = fs.openSync('/home/pi/iotjs_osguk/iotjs/http_demo/config/machine_net_interface.json', 'r');
  var buffer = new Buffer(256);
  var bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
  var str = buffer.toString();
  var obj = JSON.parse(str);

  return obj.wlan0;
}
