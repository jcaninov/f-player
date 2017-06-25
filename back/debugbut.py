import serial
import time
#import urllib2
import urllib
import re
import json


ser=serial.Serial('COM3',9600)
#button = {'<<': { 'max': 50, 'min': 49}} #,'st-mono',(17, 16),'disp-mem',(30, 29),'sound',(7, 6),'standby',(17, 16),'>>',(86, 85),'preset +',(8, 7),'tun/time',(3, 2),'summer',(30, 29),'play/puse',(165, 164),'band',(165, 166),'tun/time -',(8, 7),'locm',(50, 49),'cd stop',(691, 689),'preset-',(3, 2),'sleep',(688, 682),'function',(690, 692),'wakeup',(85, 84));
button = { }
button['>>'] = { 'max':50, 'min': 49 }
button['st-mono'] = { 'max':17, 'min': 16 }
button['disp-mem'] = { 'max':30, 'min': 29 }
button['sound'] = { 'max':7, 'min': 6 }
button['standby'] = { 'max':17, 'min': 16 }
button['<<'] = { 'max':86, 'min': 85 }
button['preset +'] = { 'max':8, 'min': 7 }
button['tun/time'] = { 'max':3, 'min': 2 }
button['summer'] = { 'max':30, 'min': 29 }
button['play/puse'] = { 'max':165, 'min': 164 }
button['band'] = { 'max':165, 'min': 166 }
button['tun/time -'] = { 'max':8, 'min': 7 }
button['locm'] = { 'max':50, 'min': 49 }
button['cd stop'] = { 'max':691, 'min': 689 }
button['preset-'] = { 'max':3, 'min': 2 }
button['sleep'] = { 'max':688, 'min': 682 }
button['function'] = { 'max':690, 'min': 692 }
button['wakeup'] = { 'max':85, 'min': 84 }

def printbut(button, elem):
	for but in button:
		#print(but);
		bmin = button[but]['min']
		bmax = button[but]['max']
		if bmin <= elem[0] <= bmax and bmin <= elem[1] <= bmax and bmin <= elem[2] <= bmax:
			print('BUTTON PRESSED: ', but, " values:",elem[0],", ",elem[1],", ",elem[2]);

while 1:
	x = ser.readline()
	#print(x)
	if len(x) > 0:
		clean = x.rstrip().decode("utf-8") #removes /l/n y converts byte literal to string
		if clean.startswith("{") :
			try:
				elem = json.loads(clean)			
				#print('String on COM: '+clean);
				printbut(button, elem['but'])
			except:
				print("Error parsing JSON: "+clean)
	time.sleep(0.001)

