## Host File
You need the line below in your /etc/hosts file.

127.0.0.1       localhost cirrusapproach.local

This is because to run cirrus approach locally you will be going to urls such as
+ http://cirrusapproach.local:3000/courses/478/stages/503/lessons/1059
+ http://cirrusapproach.local:3000/recent-activity
+ http://cirrusapproach.local:3000/my-courses

Also, the front end apps are dependent on going to cirrusapproach.local for api calls.
