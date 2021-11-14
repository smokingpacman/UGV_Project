import serial


def test_movement():
    with serial.Serial("/dev/ttyACM0", 9600) as serial_open:
        serial_open.flush()
        serial_open.write("rotate".encode("utf-8"))
        serial_open.write(",".encode("utf-8"))
        serial_open.write("180".encode("utf-8"))
        serial_open.write(",".encode("utf-8"))
        serial_open.write("360".encode("utf-8"))
        serial_open.write("\n".encode("utf-8"))
