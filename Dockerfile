FROM node:16.14.2
ENV NPM_CONFIG_LOGLEVEL info

# app files
RUN mkdir -p /cirrus-lms-fe-mono
WORKDIR /cirrus-lms-fe-mono
ADD . /cirrus-lms-fe-mono
# the next line fixes an ES MODULE Error
RUN yarn upgrade cypress
RUN yarn

EXPOSE 4201
#ENTRYPOINT ["tail", "-f", "/dev/null"]

# must call docker run with hosts addition: docker run -td -p 127.0.0.1:4201:4201 --add-host=cirrusapproach.local:0.0.0.0 chadk/cirrus-lms-fe-mono
CMD ["yarn", "ng", "serve", "--host=cirrusapproach.local","--live-reload=false"]
