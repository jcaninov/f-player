#!/bin/sh
mpc update --wait
sudo node back/rfid-log.js > rfid.txt &
node server.js &
