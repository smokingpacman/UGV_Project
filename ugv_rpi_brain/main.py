import socketio

sio = socketio.Client()


@sio.on("test")
def test():
    print("I have received your message")


# Do some connection thingy here
sio.connect()
