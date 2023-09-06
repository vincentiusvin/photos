from flask import Flask, send_file, request
import os
import base64

IMAGE_DIRECTORY = "/mnt"

app = Flask(__name__)

def encode(path:str) -> str:
    one = path.encode()
    two = base64.b64encode(one)
    three = two.decode()
    return three

def decode(id:str) -> str:
    one = id.encode()
    two = base64.b64decode(one)
    three = two.decode()
    return three


def processpath(path:str)->dict:
    image = os.path.join(IMAGE_DIRECTORY, path, "image.jpg")
    time = os.path.getmtime(image)
    id = encode(path)
    return {"path": path, "time": time, "id": id}

@app.route("/api/index")
def backend():
    return list(map(processpath, os.listdir(IMAGE_DIRECTORY)))

@app.route("/api/get-photo")
def get_photo():
    id = request.args.get("path")
    if not len(id):
        return None
    return send_file(os.path.join(IMAGE_DIRECTORY, decode(id), "image.jpg"))

@app.route("/api/get-thumbnail")
def get_thumbnail():
    id = request.args.get("path")
    if not len(id):
        return None
    return send_file(os.path.join(IMAGE_DIRECTORY, decode(id), "thumb.jpg"))

if __name__ == "__main__":
    app.run(port=8000)
