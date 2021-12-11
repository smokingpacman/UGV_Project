from smbus import SMBus

bus = SMBus(1) # indicates /dev/ic2-1

numb = 1

print ("Enter 1 for ON or 0 for OFF")
while numb == 1:

	ledstate = input(">>>>   ")
	addr = input("address? ")
	addr = int(addr, base = 16)

	if ledstate == "1":
		bus.write_byte(addr, 0x1) # switch it on
	elif ledstate == "0":
		bus.write_byte(addr, 0x0) # switch it on
	else:
		numb = 0
