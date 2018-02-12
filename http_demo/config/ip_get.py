# Copyright 2015-present Samsung Electronics Co., Ltd. and other contributors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

'''
    This program is designed to run, get the IP address from the local system and store in a config file
    on the local machine. The program will be invoked via a cron job.

    Author: Nicholas Herriot

    To install:
        /> pip install netifaces
        or
        /> pip install -r requirements.txt

    To run:
        /> python ip_get.py
        
'''

from netifaces import interfaces, ifaddresses, AF_INET, AF_LINK
import json
import os

# Create an empty dictionary to store machine network config, network interfaces (e.g. 'lo','eth0' and 'wlan0').
# Create ip address list and network interfaces list.
machine_interface_dict={}
ip_addresses = []
mac_addresses = []
network_interfaces = interfaces()
file_name = 'machine_net_interface.json'            # File name of json file
file_dir = os.getcwd()
full_file_path = file_dir + "/" + file_name


for ifaceName in interfaces():
    ip_addresses.append([i['addr'] for i in ifaddresses(ifaceName).setdefault(AF_INET, [{'addr': 'No IP addr'}])])

for ifaceName in interfaces():
    mac_addresses.append([i['addr'] for i in ifaddresses(ifaceName).setdefault(AF_LINK, [{'addr': 'No IP addr'}])])


machine_interface_dict = dict(zip(network_interfaces, zip(ip_addresses, mac_addresses)))

print('***** Found network interfaces *****')

with open(full_file_path, 'w') as fp:
    json.dump(machine_interface_dict, fp)

print('***** File Written *****')
print(' ---- File name: {}'.format(file_name))
