from contextlib import contextmanager
import serial

__version__ = "0.0.1"

SERIAL_LOCKED = False
serial_connection = serial.Serial("/dev/ttyACM0", 9600)
serial_connection.flush()


@contextmanager
def open_serial_connection():
    global SERIAL_LOCKED
    if SERIAL_LOCKED:
        raise ConnectionError("Serial connection is in use")

    SERIAL_LOCKED = True

    try:
        yield
    finally:
        SERIAL_LOCKED = False
