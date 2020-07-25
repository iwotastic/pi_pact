# Ian's BWSI PiPACT Code
This is my modification of the instructor code for BWSI PiPACT. The original code (including the original README) is available at [BWSI-piPACT/reference_code](https://github.com/BWSI-piPACT/reference_code).

## Additional Requirements
The following are additional requirments of this code on top of those found in the original repo:
- On the advertiser Raspberry Pi only:
   - `hostapd` set up to create an access point (it doesn't matter if this is a bridge or a new network) that the scanner pi can connect to
- On the scanner Raspberry Pi only:
   - WiFi connection to the advertiser Pi
- On both Raspberry Pis:
   - The CherryPy web server framework (Install with `pip3 install cherrypy`)

## Installation Tips
It is highly recommened that you set up your Raspberry Pi as outlined in [BWSI-piPACT/reference_code](https://github.com/BWSI-piPACT/reference_code), then run `deploy.py` locally (not on the Raspberry Pis) to update the project folder on the Pis with the modifications in this repo. This ensures mimimal human error in setting up the project directory.