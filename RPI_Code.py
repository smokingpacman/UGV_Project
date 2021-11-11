#!/usr/bin/env python3
import serial

if __name__ == '__main__':

    ser = serial.Serial('/dev/ttyACM0', 9600)
    ser.flush()
    

    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            print(line)
        
            command = str(input('User Input: '))
            ser.write(str(command).encode('utf-8'))
            ser.write(str('\n').encode('utf-8'))
                
            ser.reset_input_buffer()

