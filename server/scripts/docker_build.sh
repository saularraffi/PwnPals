#!/bin/bash

# initializing variables
repo="https://github.com/saularraffi/test-app.git"
branch="main"
app_name="test-app"
pwnpals_apps_dir="/tmp/pwn_pals_apps"
app_dir="$pwnpals_apps_dir"/"$app_name"

# initializing dirctories
[ ! -d "$pwnpals_apps_dir" ] && mkdir "$pwnpals_apps_dir" && echo [+] Creating "$pwnpals_apps_dir"
[ ! -d "$app_dir" ] && mkdir "$app_dir" && echo [+] Creating "$app_dir"

# clone app repo
git clone "$repo" "$app_dir"

# build docker image and run container
sudo docker build -t "$app_name" "$app_dir"
app_port=$(cat $app_dir/Dockerfile  | grep EXPOSE | awk -F ' ' '{print $2}')
sudo docker run -dp 8080:$app_port --network host "$app_name"