# Use node image from docker repo
FROM node:latest

#Set directory in container to work out of
WORKDIR /usr/src/smart-brain-api

#copy all from current root into container
COPY ./ ./

#run on build
RUN npm install

# what to run in container
CMD [ "sh" ]