import serial


def test_movement():
    with serial.Serial("/dev/ttyACM0", 9600) as serial_open:
        serial_open.write("rotate,45,45".encode("utf-8"))
