#!/bin/bash
cp apps/courses/src/environments/environment.ts.example apps/courses/src/environments/environment.ts
yarn run build-projects
if [[ $CREATE_STORYBOOK == "true" ]];
  then
    echo "building storybook"
    yarn run build-storybook;
  else
    echo "skip creating storybook";
fi
# yarn run build-projects
