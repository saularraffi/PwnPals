#!/bin/bash

function run_container() {
    image_name=$1
    app_port=$2
    visible_port=$3
    
    currently_running=$(sudo docker ps -a | grep -w "$image_name" | awk -F ' ' '{print $1}')

    if [ ! -z "$currently_running" ]; then
        sudo docker stop $currently_running >>/dev/null && echo stopping $currently_running 
        if [ $? == 1 ]; then
            echo [-] failed to stop docker container
            exit 1
        fi
        
        sudo docker rm $currently_running >>/dev/null && echo removing $currently_running 
        if [ $? == 1 ]; then
            echo [-] failed to remove docker container
            exit 1
        fi
    fi

    sudo docker run -dp "$visible_port":"$app_port" --network host "$image_name"

    if [ $? == 0 ]; then 
        echo
        echo [+] docker contianer ran successfully
        exit 0
    elif [ $? == 1 ]; then
        echo
        echo [-] failed to run docker container
        exit 1
    fi
}

function start_container() {
    image_name=$1

    container_id=$(sudo docker ps -a | grep -w "$image_name" | awk -F ' ' '{print $1}')
    sudo docker start "$container_id"

    if [ $? == 0 ]; then
        echo
        echo [+] docker contianer started successfully
        exit 0
    elif [ $? == 1 ]; then 
        echo
        echo [-] failed to start docker container
        exit 1
    fi
}

function stop_container() {
    image_name=$1

    container_id=$(sudo docker ps | grep -w "$image_name" | awk -F ' ' '{print $1}')
    sudo docker stop "$container_id"

    if [ $? == 0 ]; then 
        echo
        echo [+] docker contianer stopped successfully
        exit 0
    elif [ $? == 1 ]; then
        echo
        echo [-] failed to stop docker container
        exit 1
    fi
}

function delete_container() {
    image_name=$1

    container_id=$(sudo docker ps -a | grep -w "$image_name" | awk -F ' ' '{print $1}')

    sudo docker stop $container_id >>/dev/null && echo stopping $container_id 
    sudo docker rm "$container_id"

    if [ $? == 0 ]; then
        echo
        echo [+] docker contianer deleted successfully
        exit 0
    elif [ $? == 1 ]; then
        echo
        echo [-] failed to delete docker container
        exit 1
    fi
}

function get_container_info() {
    container_id=$1
    sudo docker inspect "$container_id" 2>/dev/null
}

function get_container_id() {
    image_name=$1
    sudo docker ps -a | grep "$image_name" | awk -F ' ' '{print $1}' 2>/dev/null
}

# allows to run specific functions from command line with arguments
"$@"