#!/bin/sh
mpc update --wait
sudo node back/rfid-log.js > rfid.txt 2> rfid.err &
node server.js > server.info 2> server.err &
