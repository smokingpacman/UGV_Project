from . import serial_connection


def test_movement():
    serial_connection.write("rotate,180,360\n".encode("utf-8"))


def rotate_arm(left_arm, right_arm):
    serial_connection.write(f"rotate,{left_arm},{right_arm}\n".encode("utf-8"))


def command_line(command):
    serial_connection.write(str(command).encode("utf-8"))
