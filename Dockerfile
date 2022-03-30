FROM node:14

COPY package.json /dist/package.json
COPY tsconfig.build.json /dist/tsconfig.build.json
COPY .env /dist/.env

ADD . /dist

WORKDIR /dist

RUN yarn && yarn cache clean && yarn build

EXPOSE 3000

RUN ls /dist/bin -al

CMD yarn --cwd /dist/bin start:prd