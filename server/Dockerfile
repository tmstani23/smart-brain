# Use node image from docker repo
FROM node:latest

#Set directory in container to work out of
RUN mkdir -p /usr/src/smart-brain-api
WORKDIR /usr/src/smart-brain-api

#copy all from current root into container
COPY ./ ./

#run on build
COPY package.json /usr/src/smart-brain-api
RUN npm install

# what to run in container
CMD [ "sh" ]