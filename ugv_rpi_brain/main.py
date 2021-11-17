from flask import Flask
from flask_socketio import SocketIO, emit

from ugv_rpi_brain import robotic_arm

app = Flask(__name__)
app.config["SECRET_KEY"] = "the-hat"
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on("connect")
def test_connect(auth):
    emit(
        "info_channel",
        {"severityLevel": 10, "message": "Client connected"},
    )
    print("Client connected")


@socketio.on("disconnect")
def test_disconnect():
    emit(
        "info_channel",
        {"severityLevel": 10, "message": "Client disconnected"},
    )
    print("Client disconnected")


@socketio.on("command_line")
def command_line(command):
    if not isinstance(command, str):
        emit(
            "info_channel",
            {
                "severityLevel": 50,
                "message": "Command line must be received as a string",
            },
        )
        return
    emit(
        "info_channel",
        {"severityLevel": 0, "message": "Received command!"},
    )
    robotic_arm.run_command(command)


if __name__ == "__main__":
    socketio.run(app)
