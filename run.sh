#!
source ./kill.sh
sudo docker run --name "react" --ip 172.17.0.2 -dp 0.0.0.0:80:80 photos-react
sudo docker run --name "flask" --ip 172.17.0.3 -v ./flask/images:/mnt -dp 127.0.0.1:8000:8000 photos-flask
