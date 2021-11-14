import serial

__version__ = "0.0.1"

serial_connection = serial.Serial("/dev/ttyACM0", 9600)
serial_connection.flush()
