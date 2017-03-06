#!/bin/sh
echo ":: MPC: Updating music database ::" ; echo ;
mpc update --wait
echo ":: Run node rfid-log.js ::" ; echo ;
sudo node back/rfid-log.js > rfid.txt 2> rfid.err &
echo ":: Run node server.js :: " ; echo ;
node server.js > server.info 2> server.err &
