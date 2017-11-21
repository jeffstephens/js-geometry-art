#!/bin/bash

propertyName=$1

if [ -z $propertyName ]; then
  echo "Usage: $0 [property name]"
  exit 1
fi

$(docker run --rm \
  -e AWS_DEFAULT_REGION=us-west-2\
  -e AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY \
  jeffstephens/docker-aws-cli aws ecr get-login --no-include-email)

docker build .\
  -t $propertyName\
  -t 288413172569.dkr.ecr.us-west-2.amazonaws.com/$propertyName

docker push 288413172569.dkr.ecr.us-west-2.amazonaws.com/$propertyName
