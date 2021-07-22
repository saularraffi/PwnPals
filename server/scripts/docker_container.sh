#!/bin/bash

function run_container() {
    app_name=$1
    app_port=$2
    visible_port=$3

    sudo docker run -dp "$visible_port":"$app_port" --network host "$app_name"
    echo
    [ $? == 0 ] && echo [+] docker contianer ran successfully && exit 0
    [ $? == 1 ] && echo [-] failed to run docker container && exit 1
}

function start_container() {
    container_id=$1
    sudo docker start "$container_id"
    echo
    [ $? == 0 ] && echo [+] docker contianer started successfully && exit 0
    [ $? == 1 ] && echo [-] failed to start docker container && exit 1
}

function stop_container() {
    container_id=$1
    sudo docker stop "$container_id"
    echo
    [ $? == 0 ] && echo [+] docker contianer stopped successfully && exit 0
    [ $? == 1 ] && echo [-] failed to stop docker container && exit 1
}

function delete_container() {
    container_id=$1
    sudo docker rm "$container_id"
    echo
    [ $? == 0 ] && echo [+] docker contianer deleted successfully && exit 0
    [ $? == 1 ] && echo [-] failed to delete docker container && exit 1
}

# allows to run specific functions from command line with arguments
"$@"