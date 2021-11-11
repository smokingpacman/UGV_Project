from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "the-hat"
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on("connect")
def test_connect(auth):
    emit("my response", {"data": "Connected"})


@socketio.on("disconnect")
def test_disconnect():
    print("Client disconnected")


if __name__ == "__main__":
    socketio.run(app)
