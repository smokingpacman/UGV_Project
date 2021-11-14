import serial


def test_movement():
    ser = serial.Serial("/dev/ttyACM0", 9600)
    ser.flush()

    while ser.in_waiting > 0:
        ser.write(str("rotate").encode("utf-8"))
        ser.write(str(",").encode("utf-8"))
        ser.write(str("180").encode("utf-8"))
        ser.write(str(",").encode("utf-8"))
        ser.write(str("360").encode("utf-8"))
        ser.write(str("\n").encode("utf-8"))
