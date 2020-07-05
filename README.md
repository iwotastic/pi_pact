# Ian's BWSI piPACT Code
This is my modification of the instructor code for BWSI PiPACT. The original code (including the original README) is available at [BWSI-piPACT/reference_code](https://github.com/BWSI-piPACT/reference_code).

## Additional Requirements
The following are additional requirments of this code on top of those found in the original repo:
- On the advertiser Pi only:
   - `hostapd` set up to create an access point (it doesn't matter if this is a bridge or a new network) that the scanner pi can connect to
- On the scanner Pi only:
   - WiFi connection to the advertiser Pi
