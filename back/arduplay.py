import serial
import time
import urllib2
#import urllib
import re
import json
from mpd import MPDClient

ser=serial.Serial('/dev/ttyACM0',9600)
#ser=serial.Serial('COM3',9600)

mode="client"
#mode="url"
lastEntry = { "time": time.time(), "but": '' }

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
					if 'rfid' in elem:
						printRfid(elem)
					else:
						printbut(button, elem['but'])
					#save_to_db(elem)								
					#print(result)				
				except ValueError as e:
					print("invalid Json: ",clean)
				except Exception as e:
					print("Error parsing JSON: ",clean)
					print(e)		
					setMpdClient()
		time.sleep(0.001)

def printRfid(elem):
	rfid = elem['rfid'].replace(" ","")
	print("Read Card: ", rfid);		
	dovalue("playlist", rfid)

def printbut(button, elem):
	global lastEntry
	if (time.time() == lastBut["time"]):
		return
	print(elem);
	for but in button:
		bmin = button[but]['min']
		bmax = button[but]['max']
		if bmin <= elem[0] <= bmax and bmin <= elem[1] <= bmax and bmin <= elem[2] <= bmax:
			#print('BUTTON PRESSED: ', but, " values:",elem[0],", ",elem[1],", ",elem[2]);
			print(but)
			lastBut["time"] = time.time()
			lastBut["but"] = but
			do(but)
			break;

def save_to_db(elem):
	query = " INSERT INTO log (channel1,channel2,channel3) VALUES (%s,%s,%s) "
	datos = (elem['but'][0], elem['but'][1], elem['but'][2])
	result = sql.execute (query,datos)
	conn.commit()

def do(action):	
	if (action):
		if(mode=="client"):
			dompd(action)
		else:
			uri = 'http://localhost:3000/player/' + action
			#print(uri)
			urllib.urlopen(uri)		

def dovalue(action, value):
	if(action):
		if(mode=="client"):
			dompd(action, value)
		else:
			uri = 'http://localhost:3000/set-rfid/' + value
			#print(uri)
			urllib.urlopen(uri)		


def dompd(action, *value):
	if (action=="play"):
		mpdclient.play()
	elif (action=="stop"):
		mpdclient.stop()
	elif (action=="next"):
		mpdclient.next()
	elif (action=="prev"):
		mpdclient.previous()
	elif (action=="band"):
		print(mpdclient.playlist())
	elif (action=="preset +"):
		printplaylist(mpdclient.playlistinfo())
	elif (action=="preset -"):
		print("playlist clear", mpdclient.clear())
	elif (action=="playlist"):
		loadplaylist(value[0])

def loadplaylist(value):
	print("Load playlist ", value)
	#lista = mpdclient.listplaylist(value[0])
	#print("Lista:", lista)
	mpdclient.stop()
	mpdclient.clear()
	try:
		mpdclient.load(value)
		printplaylist(mpdclient.playlistinfo())
		mpdclient.play()
		openurl('http://localhost:3000/set-rfid/' + value)
	except Exception as e:
		print("Error loading playlist: ", e)
		setMpdClient()
		
	 
	

def printplaylist(playlist):
	print("  -----  ")
	for song in playlist:
		print(song['file'])

def openurl(uri):
	try:
		#print(uri)
		urllib2.urlopen(uri)		
	except Exception as e:
		print("Error opening url ",uri)
		print(e)


def getButtons():
	button = { }
	button['next'] = { 'max':54, 'min': 49 }
	button['prev'] = { 'max':94, 'min': 85 }
	button['stop'] = { 'max':734, 'min': 710 }
	button['play'] = { 'max':175, 'min': 169 }
	button['sound'] = { 'max':7, 'min': 6 }	
	button['preset +'] = { 'max':9, 'min': 8 }
	button['preset -'] = { 'max':3, 'min': 2 }
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


def createMpdClient():
	client = MPDClient()               # create client object
	client.timeout = 10                # network timeout in seconds (floats allowed), default: None
	client.idletimeout = None          # timeout for fetching the result of the idle command is handled seperately, default: None
	client.connect("localhost", 6600)  # connect to localhost:6600
	#print(client.mpd_version)          # print the MPD version
	#print(client.find("artist", "manu")) # print result of the command "find any house"
	#client.close()                     # send the close command
	#client.disconnect()                # disconnect from the server
	return client

def setMpdClient():
	global mpdclient
	mpdclient = createMpdClient()

mpdclient = createMpdClient()
button = getButtons()

#print(button)
execute()


