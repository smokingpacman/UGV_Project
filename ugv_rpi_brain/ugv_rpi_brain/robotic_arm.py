import serial


def test_movement():
    ser = serial.Serial("/dev/ttyACM0", 9600)
    ser.flush()

    while True:

        if (
            ser.in_waiting > 0
        ):  # in_waiting finds the amount of bits in the input buffer. it should be 0 if nothing was sent.

            line = ser.readline().decode("utf-8").rstrip()  # reads code from the input

            if (
                line == "request"
            ):  # rpi only needs to pop up the command line if the arduino was requesting it.
                ser.write(str("rotate").encode("utf-8"))
                ser.write(str(",").encode("utf-8"))
                ser.write(str("180").encode("utf-8"))
                ser.write(str(",").encode("utf-8"))
                ser.write(str("360").encode("utf-8"))
                ser.write(str("\n").encode("utf-8"))
                break
            else:
                print(
                    line
                )  # if the arduino didn't send "request" it is most likely just sending status updates.
