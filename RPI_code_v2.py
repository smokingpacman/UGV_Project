#!/usr/bin/env python3
import serial

if __name__ == '__main__':

    ser = serial.Serial('/dev/ttyACM0', 9600)
    ser.flush()
    

    while True:
        
        if ser.in_waiting > 0:                                # in_waiting finds the amount of bits in the input buffer. it should be 0 if nothing was sent.
            
            line = ser.readline().decode('utf-8').rstrip()    # reads code from the input
            
            if (line == "request"):                           # rpi only needs to pop up the command line if the arduino was requesting it.
                command = str(input('Input Command: '))       # rotate/reset/status
                if (command == "rotate"):
                    angle1 = str(input('Input angle 1: '))
                    angle2 = str(input('Input angle 2: '))
                else:
                    angle1 = 0;0
                    angle2 = 0;
                ser.write(str(command).encode('utf-8'))
                ser.write(str(',').encode('utf-8'))
                ser.write(str(angle1).encode('utf-8'))
                ser.write(str(',').encode('utf-8'))
                ser.write(str(angle2).encode('utf-8'))
                ser.write(str('\n').encode('utf-8'))
            else:
                print(line)                              # if the arduino didn't send "request" it is most likely just sending status updates.

