# Version Information

## V1

- barebone backend app with test route and controller and database integration
- docker notes enough to run your first containerized app
- before front end integration

## V2

- bash script to create working directory, clone repo, and build container out of the app files using Dockerfile 
- POST request to /api/build that runs the script
- database entry created when images is built

## V3

- fully working basic endpoints for /builds and /containers
    - functionality includes: run build, delete build, run container, start container, stop container, delete container, etc.
    - only info needed is the image name, so container ID can keep changing and requests will stay the same
    - images and containers don't get updated, just replaced
- running build and running container delete and previous images and containers
- removing container first stops container
- database implementations for each method for each endpoint
- custom docker library created to interface with docker processes/scripts
- able to retrieve info about images and containers

## V4

- created very basic UI for some of the main pages
- log in and log out simulation
- added partial Google OAuth2
- implemented docker functionality fully with node-docker-api library, all necessary CRUD functions implemented
    - you can upload your app with an app name and GitHub url
    - you can view your apps, start, stop, and delete your apps, and open them in a new tab
- added user routes and controllers