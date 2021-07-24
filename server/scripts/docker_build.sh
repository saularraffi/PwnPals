#!/bin/bash

function build_image() {
    # initializing variables
    repo=$1
    branch=$2
    image_name=$3
    pwnpals_apps_dir="/home/saular/tmp/pwnpals"
    app_dir="$pwnpals_apps_dir"/"$image_name"

    # initializing dirctories
    [ ! -d "$app_dir" ] && mkdir -p "$app_dir" && echo; echo [+] Creating "$app_dir"

    # clone app repo
    git clone "$repo" "$app_dir"

    # build docker image
    echo
    sudo docker build -t "$image_name" "$app_dir"

    if [ $? == 0 ]; then 
        echo
        echo [+] docker image built successfully
    elif [ $? == 1 ]; then
        echo [-] failed to build docker image
        exit 1
    fi

    # clean up
    rm -rf "$app_dir"

    exit 0
}

function destroy_image() {
    image_name=$1

    echo
    sudo docker rmi "$image_name"

    if [ $? == 0 ]; then
        echo
        echo [+] docker image destroyed successfully
        exit 0
    elif [ $? == 1 ]; then
        echo [-] failed to destroyed docker image
        exit 1
    fi
}

function get_image_info() {
    image_name=$1
    sudo docker image inspect "$image_name" 2>/dev/null
}

# allows to run specific functions from command line with arguments
"$@"