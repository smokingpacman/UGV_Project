from . import serial_connection


def test_movement():
    serial_connection.write(str("rotate,180,360\n").encode("utf-8"))
