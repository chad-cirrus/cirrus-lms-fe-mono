# Dev Environment
As of today, December 2022, there are 5 applications that you have to run in order to develop locally.
* Api
* MS (Media Server/Scorm Server)
* FE
* Courses
* Recent-Activity

## API
Ruby on Rails [API](https://github.com/cirrusaircraft/cirrus-lms-api) currently maintained by Mike Yockey and Craig Orcutt (fortyAU).
This author uses Ruby 2.5.8 via RVM.
The command this author uses is `/usr/bin/env STORAGE_CONTAINER=cirruslmsherokudevcontainer ECOMMERCE_DEBUG=true DOMAIN=cirrusapproach.local bundle exec rails s`.

# MS (Media Server/Scorm Server)
A Ruby server that supplies the scorm content to the FE and Courses app. This author uses RVM to use Ruby 2.6.6.
The command to run [MS](https://github.com/cirrusaircraft/cirrus-lms-ms) is `CONTAINER_PATH=cirruslmsherokudevcontainer/content-items/scorm RAILS_SERVE_STATIC_FILES=enabled STORAGE_ACCOUNT_NAME=cirrusapproachherokuprod STORAGE_ACCESS_KEY=/Bak+DpS7KCtWhc1SY+o4AKdcAhvWasHxS7J/bUfiaKTNwTW1TXuB1ScGTlyVzCCsNUB5b2O8sg0aLxRW/15HA== bin/rails s -p 3005`.

## FE
This is the original Cirrus Approach Angular app, aka [Legacy FE](https://github.com/cirrusaircraft/cirrus-lms-fe).
It was developed prior to the arrival of the fortyAU devs. Node 14.18 is required to run application in dev mode.
This author uses NVM. NVM is convenient because the Courses and Recent-Activity require Node 16.10.
The command this author uses is `/usr/bin/env SIGN_IN=http://cirrusapproach.local:3000/saml/auth yarn start-ng --host cirrusapproach.local`
FE's Angular version is 11. At the time of this documentation, Angular is at version 15.
A crucial reason for MFE strategy for Courses, Recent-Activity and upcoming Instructor Dashboard was the inability to upgrade FE to Angular 13 (the current version of Angular at that time, October 2021).

## Courses
The first MFE. This was spun up in Angular 13 via [NX](https://nx.dev/)  More details for NX use can be found [here](./CirrusNx.MD). The Courses MFE lives in the [mono](https://github.com/cirrusaircraft/cirrus-lms-fe-mono) repo.

## Recent Activity
The second MFE. Remarkably similar to Courses.  The Recent Activity lives in the [mono](https://github.com/cirrusaircraft/cirrus-lms-fe-mono) repo.
