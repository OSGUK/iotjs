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

var fs = require('fs');

http.createServer(function (req, res) {
 // The path for onoff.html is relevant. Here I assume that it's in the same directory of 
 // the server file and iotjs binary. Change it in relevant to your iotjs binary path
 // Otherwise, put server_html.js and onoff.html in the same directory and have a symoblic
 // link of iotjs binary in that directory as well.
 fs.readFile('onoff.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(port);
