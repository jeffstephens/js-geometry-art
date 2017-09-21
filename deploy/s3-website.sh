#!/bin/bash

docker run \
  -it \
  -e "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" \
  -e "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" \
  -v "$(pwd)":/src \
  --rm \
  jeffstephens/s3-website-dockerized "$@"
