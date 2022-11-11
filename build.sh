#!/bin/bash
build_result=0
storybook_result=0

environment=${NX_ENV=production}

yarn nx run-many --target=build --projects=courses,atc,recent-activity --configuration="$environment"
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
