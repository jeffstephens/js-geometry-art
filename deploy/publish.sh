#!/bin/bash

echo "Building & publishing site to S3..."

if [ -z $AWS_ACCESS_KEY_ID ]; then
  echo "Error: No AWS_ACCESS_KEY_ID found in environment."
  exit 1
fi

if [ -z $AWS_SECRET_ACCESS_KEY ]; then
  echo "Error: No AWS_SECRET_ACCESS_KEY found in environment."
  exit 2
fi

scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$scriptDir/.."

curl -O https://raw.githubusercontent.com/jeffstephens/s3-website-dockerized/master/s3-website.sh
chmod +x s3-website.sh
./s3-website.sh push
rm ./s3-website.sh
