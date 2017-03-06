import serial
import time
import urllib2
import re
ser=serial.Serial('/dev/ttyACM0',9600)
while 1:
	x = ser.readline()
	if len(x) > 0:
		clean = re.sub('[\n\r ]','',x)
		print(repr(clean))
		uri = 'http://localhost:3000/set-rfid/' + clean.lower()
		urllib2.urlopen(uri)
	time.sleep(1)
