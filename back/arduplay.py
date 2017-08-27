import serial
import time
#import urllib2
import urllib
import re
import json
from mpd import MPDClient

ser=serial.Serial('/dev/ttyACM0',9600)
#ser=serial.Serial('COM3',9600)

def createMpdClient():
	client = MPDClient()               # create client object
	client.timeout = 10                # network timeout in seconds (floats allowed), default: None
	client.idletimeout = None          # timeout for fetching the result of the idle command is handled seperately, default: None
	client.connect("localhost", 6600)  # connect to localhost:6600
	print(client.mpd_version)          # print the MPD version
	print(client.find("any", "house")) # print result of the command "find any house"
	client.close()                     # send the close command
	client.disconnect()                # disconnect from the server

def execute():
	#print(button)
	while 1:
		x = ser.readline()
		if len(x) > 0:
			#print(x)
			clean = x.rstrip().decode("utf-8") #removes /l/n y converts byte literal to string
			if clean.startswith("{") :
				try:
					#print("CLEAN: [ ", clean, " ]")
					elem = json.loads(clean)
					#print(elem)
				except:
					print("Error parsing JSON: ",clean)

				if elem && 'rfid' in elem:
					printRfid(elem)
				else:
				#	uri = 'http://localhost:3000/set-rfid/' + elem.rfid.lower()
				#	urllib.urlopen(uri)		
					printbut(button, elem['but'])
				#save_to_db(elem)								
				#print(result)				
		time.sleep(0.001)

def printRfid(elem):
	rfid = elem['rfid'].replace(" ","")
	print("Read Card: ", rfid);		
	uri = 'http://localhost:3000/set-rfid/' + rfid.lower()
	urllib.urlopen(uri)		

def printbut(button, elem):
	print(elem);
	for but in button:
		bmin = button[but]['min']
		bmax = button[but]['max']
		if bmin <= elem[0] <= bmax and bmin <= elem[1] <= bmax and bmin <= elem[2] <= bmax:
			#print('BUTTON PRESSED: ', but, " values:",elem[0],", ",elem[1],", ",elem[2]);
			print(but)
			do(but)
			break;

def save_to_db(elem):
	query = " INSERT INTO log (channel1,channel2,channel3) VALUES (%s,%s,%s) "
	datos = (elem['but'][0], elem['but'][1], elem['but'][2])
	result = sql.execute (query,datos)
	conn.commit()

def do(action):	
	if (action):
		uri = 'http://localhost:3000/player/' + action
		#print(uri)
		urllib.urlopen(uri)		


def getButtons():
	button = { }
	button['next'] = { 'max':54, 'min': 49 }
	button['prev'] = { 'max':94, 'min': 85 }
	button['stop'] = { 'max':734, 'min': 710 }
	button['play'] = { 'max':175, 'min': 169 }
	button['sound'] = { 'max':7, 'min': 6 }	
	button['preset +'] = { 'max':9, 'min': 8 }
	button['preset-'] = { 'max':3, 'min': 2 }
	button['sleep'] = { 'max':740, 'min': 735 }
	button['disp-mem'] = { 'max':33, 'min': 29 }
	button['mode'] = { 'max':17, 'min': 16 }
	#	button['standby'] = { 'max':17, 'min': 16 }
	#	button['tun/time'] = { 'max':3, 'min': 2 }
	#	button['summer'] = { 'max':30, 'min': 29 }
	button['band'] = { 'max':182, 'min': 177 }
	#	button['tun/time -'] = { 'max':8, 'min': 7 }
	#	button['locm'] = { 'max':50, 'min': 49 }
	#	button['function'] = { 'max':690, 'min': 692 }
	#	button['wakeup'] = { 'max':85, 'min': 84 }
	return button

button = getButtons();

#print(button)
execute()


