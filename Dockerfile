FROM node:16.16.0-alpine

WORKDIR /app
COPY . /app
RUN npm install

