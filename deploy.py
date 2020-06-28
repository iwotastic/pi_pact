"""
This file is to be executed on your computer, not on a host Raspberry Pi. This will automatically send all required files to the Pi over SFTP. This requires you have the paramiko library installed.
"""

from paramiko import *
import os
import io
import argparse

# Set up parameters
parser = argparse.ArgumentParser(description="Automatically transfers PiPACT code to Raspberry Pi")
parser.add_argument("--user", "-u", default="pi", required=False, help="Username to ssh as")
parser.add_argument("--address", "-a", required=True, help="Address to connect to")
parser.add_argument("--folder", "-f", default="reference_code", required=False, help="Folder relative to home folder of USER to upload to")

# Get args
args = parser.parse_args()

# Connect
client = SSHClient()
client.load_system_host_keys()
client.connect(args["address"], username=args["user"])

# Connect SFTP
with client.open_sftp() as sftp:
  # Set up files to send
  filesToSend = [
    "pi_pact.py"
  ]

  # Send to main dir
  for fileToSend in filesToSend:
    print("Sending " + fileToSend + " to main directory...")
    sftp.put(os.getcwd() + "/" + fileToSend, "/home/" + args["user"] + "/" + args["folder"] + "/" + fileToSend)

  print("All files sent!")