#!/bin/bash
yarn run build-projects
if [[ $CREATE_STORYBOOK == "true" ]];
  then
    echo "building storybook"
    yarn run build-storybook;
  else
    echo "skip creating storybook";
fi
# yarn run build-projects
