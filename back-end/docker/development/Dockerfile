FROM node:12.13.0-alpine

RUN apk update && apk add build-base git python

ENV NODE_ENV=development

WORKDIR /usr/src/app

RUN yarn global add nodemon
RUN yarn global add typescript
RUN yarn global add ts-node
