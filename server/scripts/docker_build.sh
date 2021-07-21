#!/bin/bash

function test() {
    echo this is a test
    echo $1
    echo $2
    echo $3
}

function build_image() {
    # initializing variables
    repo=$1
    branch=$2
    image_name=$3
    pwnpals_apps_dir="/home/saular/tmp/pwnpals"
    app_dir="$pwnpals_apps_dir"/"$image_name"

    # initializing dirctories
    [ ! -d "$app_dir" ] && mkdir -p "$app_dir" && echo [+] Creating "$app_dir"

    # clone app repo
    git clone "$repo" "$app_dir"

    # build docker image
    echo docker --> sudo docker build -t "$image_name" "$app_dir"
    sudo docker build -t "$image_name" "$app_dir"
    [ $? == 0 ] && echo [+] docker image built successfully
    [ $? == 1 ] && echo [-] failed to build docker image && exit 1

    # clean up
    rm -rf "$app_dir"

    exit 0
}

function destroy_image() {
    image_name=$1

    sudo docker rmi "$image_name"
    [ $? == 0 ] && echo [+] docker image destroyed successfully && exit 0
    [ $? == 1 ] && echo [-] failed to destroyed docker image && exit 1
}

# allows to run specific functions from command line with arguments
"$@"




# # run docker container
# app_port=$(cat $app_dir/Dockerfile  | grep EXPOSE | awk -F ' ' '{print $2}')
# sudo docker run -dp 8080:$app_port --network host "$app_name"
# [ $? == 0 ] && echo [+] docker contianer ran successfully
# [ $? == 1 ] && echo [-] failed to run docker container && exit 1

# # stop container
# container_id=$(sudo docker ps | grep $app_name | awk -F ' ' '{print $1}')
# sudo docker stop $container_id
# [ $? == 0 ] && echo [+] docker contianer stopped successfully
# [ $? == 1 ] && echo [-] failed to stop docker container