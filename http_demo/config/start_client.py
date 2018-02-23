#!/usr/bin/env python

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



# imports statements go here
#import sh
import os
from ip_get import detect_interfaces

# Let the user know we are alive
def run_logging():
	print(" **** Python Bash Replacement. Starting Client Processes **** ")

# Run the get IP/MAC script. Used to create a json file containing the computer details for IoTJS TO READ.
def run_get_ip():
   detect_interfaces()
# Run the registration client program
def run_register_machine():
   os.system("iotjs ../client_registration.js")


# Run the update client program
def run_update_machine():
   os.system("iotjs ../client_update.js")

if __name__=="__main__":
   run_logging()
   run_get_ip()
   run_register_machine()
   run_update_machine()
