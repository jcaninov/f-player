echo ; echo '.:: server.err ::.' ; echo
tail -n 15 server.err
echo ; echo '.:: server.info ::.' ; echo
tail -n 15 server.info
echo ; echo '.:: rfid.txt ::. ' ; echo
cat rfid.txt

