#!/bin/bash
build_result=0
storybook_result=0

environment=${NX_ENV=production}

cp apps/courses/src/environments/environment.ts.example apps/courses/src/environments/environment.ts
cp apps/recent-activity/src/environments/environment.ts.example apps/recent-activity/src/environments/environment.ts
cp apps/redeem/src/environments/environment.ts.example apps/redeem/src/environments/environment.ts
yarn nx run-many --target=build --projects=courses,atc,recent-activity,ctc-admin,redeem --configuration="$environment"
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
