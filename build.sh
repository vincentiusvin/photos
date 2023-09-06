#!
echo "Building React ..."
cd ./react
npm run build
cd ..

echo "Building images ..."
sudo docker build -t photos-flask ./flask
sudo docker build -t photos-react ./react

sudo docker image prune
