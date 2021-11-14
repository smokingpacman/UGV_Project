from . import serial_connection


def test_movement():
    serial_connection.write(str("rotate").encode("utf-8"))
    serial_connection.write(str(",").encode("utf-8"))
    serial_connection.write(str("180").encode("utf-8"))
    serial_connection.write(str(",").encode("utf-8"))
    serial_connection.write(str("360").encode("utf-8"))
    serial_connection.write(str("\n").encode("utf-8"))
