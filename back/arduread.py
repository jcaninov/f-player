import serial
import time
#import urllib2
import urllib
import re
import json
# DDBB Connection
#import MySQLdb
import pymysql.cursors
conn = pymysql.connect(host= "localhost", user="root", passwd="root", db="sonybuttons")
sql = conn.cursor()
result = sql.execute("TRUNCATE TABLE log")
#print(result)
#ser=serial.Serial('/dev/ttyACM0',9600)
ser=serial.Serial('COM3',9600)

def execute():
	print(button)
	while 1:
		x = ser.readline()
		if len(x) > 0:
			#print(x)
			clean = x.rstrip().decode("utf-8") #removes /l/n y converts byte literal to string
			if clean.startswith("{") :
				try:
					#print(clean)
					elem = json.loads(clean)
					#print(elem)
				except:
					print("Error parsing JSON: ",clean)

				if 'rfid' in elem:
					printRfid(elem)
				else:
				#	uri = 'http://localhost:3000/set-rfid/' + elem.rfid.lower()
				#	urllib.urlopen(uri)		
					printbut(button, elem['but'])
				#save_to_db(elem)								
				#print(result)				
		time.sleep(0.001)

def printRfid(elem):
	print("Read Card: ", elem['rfid']);

def printbut(button, elem):
	print(elem);
	for but in button:
		#print(but);
		bmin = button[but]['min']
		bmax = button[but]['max']
		if bmin <= elem[0] <= bmax and bmin <= elem[1] <= bmax and bmin <= elem[2] <= bmax:
			print('BUTTON PRESSED: ', but, " values:",elem[0],", ",elem[1],", ",elem[2]);
			break;

def save_to_db(elem):
	query = " INSERT INTO log (channel1,channel2,channel3) VALUES (%s,%s,%s) "
	datos = (elem['but'][0], elem['but'][1], elem['but'][2])
	result = sql.execute (query,datos)
	conn.commit()

def getButtons():
	button = { }
	button['>>'] = { 'max':54, 'min': 49 }
	button['<<'] = { 'max':91, 'min': 85 }
	button['cd stop'] = { 'max':695, 'min': 667 }
	button['play/puse'] = { 'max':175, 'min': 169 }
	button['sound'] = { 'max':7, 'min': 6 }	
	button['preset +'] = { 'max':9, 'min': 8 }
	button['preset-'] = { 'max':3, 'min': 2 }
	button['sleep'] = { 'max':688, 'min': 678 }
	button['disp-mem'] = { 'max':33, 'min': 29 }
	button['st-mono'] = { 'max':17, 'min': 16 }
#	button['standby'] = { 'max':17, 'min': 16 }
#	button['tun/time'] = { 'max':3, 'min': 2 }
#	button['summer'] = { 'max':30, 'min': 29 }
#	button['band'] = { 'max':165, 'min': 166 }
#	button['tun/time -'] = { 'max':8, 'min': 7 }
#	button['locm'] = { 'max':50, 'min': 49 }
#	button['function'] = { 'max':690, 'min': 692 }
#	button['wakeup'] = { 'max':85, 'min': 84 }
	return button

button = getButtons();

#print(button)
execute()


