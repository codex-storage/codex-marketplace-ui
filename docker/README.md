# Codex Marketplace UI Docker images

## Description

 We are shipping Codex Marketplace UI as a Docker image as well.

 [Dockerfile](Dockerfile) is using multi-stage build and we use `alpine` image to speed up the build and to minimize the final Docker image size we are using a lightweight Nginx image.


## Build locally

 We can build image locally in the following way
 1. [Install Docker](https://docs.docker.com/engine/install)

 2. Clone repository
    ```shell
    git clone https://github.com/codex-storage/codex-marketplace-ui
    cd codex-marketplace-ui
    ```

 3. Build the image
    ```shell
    # Variables
    VITE_CODEX_API_URL=<Default Codex API URL>
    VITE_GEO_IP_URL=<GeoIP API URL>

    # Build
    docker build \
      --build-arg VITE_CODEX_API_URL=${VITE_CODEX_API_URL} \
      --build-arg VITE_GEO_IP_URL=${VITE_GEO_IP_URL} \
      --no-cache \
      -f docker/Dockerfile \
      -t codex-marketplace-ui:local .
    ```


## How to run

 Base [Nginx image](https://hub.docker.com/_/nginx) is [exposing](https://docs.docker.com/reference/dockerfile/#expose) port 80 and we can [publish](https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/) it to a custom local port
 ```shell
 docker run \
   --rm \
   --name codex-marketplace-ui \
   -p 3000:80 \
   codexstorage/codex-marketplace-ui:latest
 ```

 Access UI on http://localhost:3000.

 And we also can set Nginx custom port using `APP_PORT` variable. That is useful when use the `host` network mode for a container
 ```shell
 docker run \
   --rm \
   --name codex-marketplace-ui \
   --net=host \
   -e 'APP_PORT=3000' \
   codexstorage/codex-marketplace-ui:latest
 ```
