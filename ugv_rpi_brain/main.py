from flask import Flask
from flask_socketio import SocketIO, emit

# from ugv_rpi_brain import robotic_arm

app = Flask(__name__)
app.config["SECRET_KEY"] = "the-hat"
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on("connect")
def test_connect(auth):
    print("Client connected")


@socketio.on("test_rotate")
def test_rotate():
    print("Rotating")
    # robotic_arm.test_movement()


@socketio.on("test_random")
def test_random():
    print("Ni howdy")


@socketio.on("disconnect")
def test_disconnect():
    print("Client disconnected")


@socketio.on("rotate")
def rotate(data):
    print("BLAHFASOKFLSJDLK:F:")
    print(data)
    print(str(data))


@socketio.on("command_line")
def command_line(data):
    if not isinstance(data, str):
        emit(
            "info_channel",
            {"level": 50, "message": "Command line must be received as a string"},
        )
        return
    print(data)


if __name__ == "__main__":
    socketio.run(app)
