#!/bin/bash

# initializing variables
repo="https://github.com/saularraffi/test-app.git"
branch="main"
app_name="test-app"
pwnpals_apps_dir="/home/saular/tmp/pwnpals"
app_dir="$pwnpals_apps_dir"/"$app_name"

# initializing dirctories
# [ ! -d "$pwnpals_apps_dir" ] && mkdir -p "$pwnpals_apps_dir" && echo [+] Creating "$pwnpals_apps_dir"
[ ! -d "$app_dir" ] && mkdir -p "$app_dir" && echo [+] Creating "$app_dir"

# clone app repo
git clone "$repo" "$app_dir"

# build docker image
echo docker --> sudo docker build -t "$app_name" "$app_dir"
sudo docker build -t "$app_name" "$app_dir"
[ $? == 0 ] && echo [+] docker image built successfully
[ $? == 1 ] && echo [-] failed to build docker image && exit 1

# run docker container
app_port=$(cat $app_dir/Dockerfile  | grep EXPOSE | awk -F ' ' '{print $2}')
sudo docker run -dp 8080:$app_port --network host "$app_name"
[ $? == 0 ] && echo [+] docker contianer ran successfully
[ $? == 1 ] && echo [-] failed to run docker container && exit 1

# stop container
container_id=$(sudo docker ps | grep $app_name | awk -F ' ' '{print $1}')
sudo docker stop $container_id
[ $? == 0 ] && echo [+] docker contianer stopped successfully
[ $? == 1 ] && echo [-] failed to stop docker container

# clean up
rm -rf "$app_dir"

exit 0