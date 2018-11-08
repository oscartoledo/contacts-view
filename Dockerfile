FROM node:8.11.3 as builder

COPY package.json /home/app/package.json

RUN cd /home/app \
  && npm install

ADD . /home/app

RUN cd /home/app \
  && npm run build

FROM nginx:1.15.3-alpine 

LABEL maintainer="Oscar Toledo <osky.toledo@gmail.com>"

COPY --from=builder /home/app/dist /usr/share/nginx/html

