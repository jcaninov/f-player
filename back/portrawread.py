import serial
import time
#import urllib2
import urllib
import re
import json
# DDBB Connection
#import MySQLdb
#import pymysql.cursors
#conn = pymysql.connect(host= "localhost", user="root", passwd="root", db="sonybuttons")
#sql = conn.cursor()
#result = sql.execute("TRUNCATE TABLE log")
#print(result)
ser=serial.Serial('/dev/ttyACM0',9600)
#ser=serial.Serial('COM3',9600)

def execute():
	#print(button)
	while 1:
		x = ser.readline()
		print(x)
		#clean = x.rstrip().decode("utf-8") #removes /l/n y converts byte literal to string
		#if clean.startswith("{") :
		#	try:
				#print("CLEAN: [ ", clean, " ]")
		#		elem = json.loads(clean)
				#print(elem)
		#	except:
		#		print("Error parsing JSON: ",clean)

		#	if elem && 'rfid' in elem:
		#		printRfid(elem)
		#	else:
			#	uri = 'http://localhost:3000/set-rfid/' + elem.rfid.lower()
			#	urllib.urlopen(uri)		
		#		printbut(button, elem['but'])
			#save_to_db(elem)								
			#print(result)				
		time.sleep(0.001)

execute()


