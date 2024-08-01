FROM node:20.16.0

RUN yarn global add serve
RUN mkdir ./build
COPY ./build ./build

ENTRYPOINT ["serve", "-s", "build"]