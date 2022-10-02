from flask_socketio import emit
from . import serial_connection, open_serial_connection


def run_command(command):
    with open_serial_connection():
        serial_connection.write(str(command).encode("utf-8"))

        while True:
            # in_waiting finds the amount of bits in the input buffer. it should be 0 if nothing was sent.
            if serial_connection.in_waiting > 0:
                line = serial_connection.readline().decode("utf-8").rstrip()

                if line == "request":
                    # The arduino is ready for another command. Break out of loop
                    break

                emit(
                    "rpi_info",
                    {"severityLevel": 10, "message": line},
                )
