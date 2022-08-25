#!/bin/bash
build_result=0
storybook_result=0

cp apps/courses/src/environments/environment.ts.example apps/courses/src/environments/environment.ts
yarn run build-projects
build_result=$?
if [[ $CREATE_STORYBOOK == "true" ]];
  then
    echo "building storybook"
    yarn run build-storybook;
    storybook_result=$?
  else
    echo "skip creating storybook";
fi

exit $((build_result + storybook_result))
