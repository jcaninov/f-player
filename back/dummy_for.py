#button = { '<<': { 'max':50, 'min': 49 } },'st-mono': { 'max':17, 'min': 16 } ,'disp-mem': { 'max':30, 'min': 29 } ,'sound': { 'max':7, 'min': 6 } ,'standby': { 'max':17, 'min': 16 } ,'>>': { 'max':86, 'min': 85 } ,'preset +': { 'max':8, 'min': 7 } ,'tun/time': { 'max':3, 'min': 2 } ,'summer': { 'max':30, 'min': 29 } ,'play/puse': { 'max':165, 'min': 164 } ,'band': { 'max':165, 'min': 166 } ,'tun/time -': { 'max':8, 'min': 7 } ,'locm': { 'max':50, 'min': 49 } ,'cd stop': { 'max':691, 'min': 689 } ,'preset-': { 'max':3, 'min': 2 } ,'sleep': { 'max':688, 'min': 682 } ,'function': { 'max':686, 'min': 688 } ,'wakeup': { 'max':85, 'min': 84 } }

button = { }
button['<<'] = { 'max':50, 'min': 49 }
button['st-mono'] = { 'max':17, 'min': 16 }
button['disp-mem'] = { 'max':30, 'min': 29 }
button['sound'] = { 'max':7, 'min': 6 }
button['standby'] = { 'max':17, 'min': 16 }
button['>>'] = { 'max':86, 'min': 85 }
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
		bmin = button[but]['min']
		bmax = button[but]['max']
		
		#print(but, " min: ", bmin, " max: ",bmax)

		if bmin <= elem['but'][0]:
			if elem['but'][0] <= bmax:
				print("BUTTON PRESSED: ", but)


elem = {'but' : [164, 164, 164]}
printbut(button, elem);