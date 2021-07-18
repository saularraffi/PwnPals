# PwnPals

This is a website that allows hackers and app developers to come together and challenge each other's skills.  Programmers and developers can upload their web/mobile apps and hackers can attempt to exploit those apps.

# Docker Setup

install docker 

```
$ sudo apt install docker.io -y
```

check if docker is running 

```
$ sudo systemctl status docker
```

if it is innactive, run

```
$ sudo systemctl enable docker
```

to see local images

```
$ sudo docker images
```

# MongoDB Setup

```
$ wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

$ sudo apt-get install -y mongodb
```

specifications 

```
$ mongodb --version

MongoDB shell version v3.6.8
git version: 8e540c0b6db93ce994cc548f000900bdc740f80a
OpenSSL version: OpenSSL 1.1.1f  31 Mar 2020
allocator: tcmalloc
modules: none
build environment:
    distarch: x86_64
    target_arch: x86_64
```

## Download and install mongodb compass

download package (.dep) from https://www.mongodb.com/try/download/compass?tck=docs_compass

move package to ```/opt```

install the compass 

```
$ sudo dpkg -i /opt/mongodb-compass_1.28.1_amd64.deb
```

# Notes

build docker image
```
$ sudo docker build -t <name> .
```

run docker container
```
$ sudo docker run -dp <ext-port>:<in-port> --network host <image>
```

docker start/stop container
```
$ sudo start <id>
$ sudo docker stop <id>
```

list docker containers 
```
$ sudo docker ps [-a include stopped containers]
```

rmove docker container(s)
```
$ sudo docker rm <id-1> <id-2> ...
```

remove docker image
```
$ sudo docker rmi <name>
```

to start an interactive shell with your running docker container 
```
$ sudo docker exec -it <id> sh [or bash]
```

to see docker container logs 
```
$ sudo docker logs <id>
```

# Helpful Resources

- [exposing docker container app to host](https://stackoverflow.com/questions/57773604/connection-reset-by-peer-when-when-hitting-docker-container)