"""
This file is to be executed on your computer, not on a host Raspberry Pi. This will automatically send all required files to the Pi over SFTP. This requires you have the paramiko library installed.
"""

from paramiko import *
import os
import io
import argparse
from getpass import getpass

# Set up parameters
parser = argparse.ArgumentParser(description="Automatically transfers PiPACT code to Raspberry Pi")
parser.add_argument("--user", "-u", default="pi", required=False, help="Username to ssh as")
parser.add_argument("--address", "-a", required=True, help="Address to connect to")
parser.add_argument("--folder", "-f", default="reference_code", required=False, help="Folder relative to home folder of USER to upload to")
parser.add_argument("--use-ssh-key", "-k", action="store_true")

# Get args
args = parser.parse_args()

# Connect
client = SSHClient()

if args.use_ssh_key:
  client.load_system_host_keys()

client.set_missing_host_key_policy(AutoAddPolicy())
client.connect(args.address, username=args.user, password=getpass("Password for " + args.user + ": "))

# Connect SFTP
with client.open_sftp() as sftp:
  # Set up files to send
  filesToSend = [
    "pi_pact.py",
    "pi_pact_config.yml",
    "index.html"
  ]

  # Send to main dir
  for fileToSend in filesToSend:
    print("Sending " + fileToSend + " to main directory...")
    sftp.put(os.getcwd() + "/" + fileToSend, "/home/" + args.user + "/" + args.folder + "/" + fileToSend)

  # Set up files to send
  filesToSendServerFiles = [
    "script.js",
    "style.css"
  ]

  # Send to main dir
  for fileToSend in filesToSendServerFiles:
    print("Sending " + fileToSend + " to server directory...")
    sftp.put(os.getcwd() + "/server_files/" + fileToSend, "/home/" + args.user + "/" + args.folder + "/server_files/" + fileToSend)

  print("All files sent!")