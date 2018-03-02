# Basic Setup Needed To Run The Demo Light Controller

This describes the packages and setup of the light controller needed to get the lights working on your Raspberry Pi.


## Software Packages Required

The software packages needed are:

### Setup Service Helper
Install rcconf to allow you to interrogate and verify different services running on the Pi.

	/>  sudo apt-get install rcconf

### Setup Python and Python Packages
Python is used to identify IP and MAC address. The ip_get.py is run on startup to identify those values and store them in machine_net_interface.json
To allow this python script to run properly it requires some non standard python libraries. To install them do:
	/> cd ~/iotjs/http_demo/config
	/> sudo pip install -r requirements.txt


## Setting Up Services


## Checking The Light Works


## Checking The Light Server Is Working


## Checking The Light Is Registered With The Discovery Server


## Changing Configuration Of The Light